"use client";

import { getCarbonDetails } from "@/app/api/carbondetailsService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Middleware: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    // Yönlendirme yapılmaması gereken sayfalar
    const excludePaths = ["/user/signin", "/detail", "/details"];

    // Eğer token yoksa, signin sayfasına yönlendir
    if (!token) {
      if (!excludePaths.some((path) => currentPath.includes(path))) {
        router.push("/user/signin");
      }
      return;
    }

    // Eğer token varsa, geçerliliğini kontrol et
    const checkTokenValidity = async () => {
      try {
        const response = await getCarbonDetails(token);

        if (response.statusCode === 401) {
          // Token geçersizse, token'ı sil ve signin sayfasına yönlendir
          localStorage.removeItem("token");
          if (!excludePaths.some((path) => currentPath.includes(path))) {
            router.push("/user/signin");
          }
        } else {
          // Token geçerliyse, dashboard'a yönlendir
          if (!excludePaths.some((path) => currentPath.includes(path))) {
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("Token kontrolü sırasında bir hata oluştu:", error);
        // Hata durumunda da kullanıcıyı signin sayfasına yönlendir
        localStorage.removeItem("token");
        if (!excludePaths.some((path) => currentPath.includes(path))) {
          router.push("/user/signin");
        }
      }
    };

    // Token geçerliyse kontrol et
    checkTokenValidity();
  }, [router]);

  return null;
};

export default Middleware;
