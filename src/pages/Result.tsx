import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState<string>("");

  const email = sessionStorage.getItem("email") || "";
  const usageKey = `usageCount_${email}`;
  const usageCount = parseInt(localStorage.getItem(usageKey) || "0", 10);
  const remaining = 8 - usageCount;

  useEffect(() => {
    const stateImage = location.state?.imageUrl;
    const savedImage = localStorage.getItem("generatedImageUrl");

    if (stateImage) {
      setImageUrl(stateImage);
    } else if (savedImage) {
      setImageUrl(savedImage);
    } else {
      alert("이미지가 존재하지 않습니다!");
      navigate("/input");
    }
  }, [location.state, navigate]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "avatar_result.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 px-4">
        <h2 className="text-5xl font-bold text-pink-600 mb-8">🎉 결과 이미지</h2>

        <img
            src={imageUrl}
            alt="생성된 아바타"
            className="w-[350px] h-[350px] rounded-xl shadow-lg object-cover mb-6"
        />

        <p className="text-xl text-gray-700 mb-6">
          남은 이미지 생성 가능 횟수:{" "}
          <span className="text-pink-500 font-bold text-2xl">{remaining}</span> / 8
        </p>

        <div className="flex gap-6">
          <button
              onClick={handleDownload}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md text-lg transition"
          >
            다운로드
          </button>

          <button
              onClick={() => navigate("/input")}
              className="bg-white text-pink-600 border border-pink-400 font-semibold px-6 py-3 rounded-full shadow-md text-lg hover:bg-pink-50 transition"
          >
            다시 생성하기
          </button>

          <button
              onClick={() => navigate("/")}
              className="bg-gray-100 text-gray-700 border border-gray-300 font-semibold px-6 py-3 rounded-full shadow-md text-lg hover:bg-gray-200 transition"
          >
            홈으로
          </button>
        </div>
      </div>
  );
};

export default Result;
