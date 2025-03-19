import { useState } from "react";

const Features = () => {
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState("");
  const [pipeCount, setPipeCount] = useState(0);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/detect/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setResultImage(data.image_url); // Cập nhật ảnh hiển thị
      setPipeCount(data.pipe_count || 0); // Số lượng ống nước
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
    }
  };

  return (
    // <div className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md bg-gray-100">
    //   <h1 className="text-2xl font-bold">Phát hiện ống nước trong ảnh</h1>

    //   <input
    //     type="file"
    //     accept="image/*"
    //     onChange={(e) => setImage(e.target.files[0])}
    //     className="p-2 border rounded-md"
    //   />

    //   <button
    //     onClick={handleUpload}
    //     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //   >
    //     Tải lên và phát hiện
    //   </button>

    //   {resultImage && (
    //     <>
    //       <img
    //         src={resultImage}
    //         alt="Detected Result"
    //         className="mt-4 w-64 border-2 border-gray-300 rounded-md"
    //       />
    //       <p className="text-lg font-semibold">
    //         Ống nước phát hiện: {pipeCount}
    //       </p>
    //     </>
    //   )}
    // </div>
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Nhận diện ống nước</h1>
      <img
        src="http://127.0.0.1:8000/video_feed"
        alt="Camera Feed"
        className="w-full max-w-3xl border-2 border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Features;
