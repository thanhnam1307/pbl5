# # from fastapi import FastAPI, UploadFile, File
# # import cv2
# # import numpy as np
# # from ultralytics import YOLO
# # import shutil
# # from pathlib import Path
# # from fastapi.middleware.cors import CORSMiddleware
# # from fastapi.staticfiles import StaticFiles

# # app = FastAPI()

# # # Cấu hình CORS
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Chấp nhận tất cả origin (có thể thay bằng ["http://localhost:5173"])
# #     allow_credentials=True,
# #     allow_methods=["*"],  # Cho phép tất cả phương thức (GET, POST, PUT, DELETE, v.v.)
# #     allow_headers=["*"],  # Cho phép tất cả headers
# # )

# # # Load mô hình YOLOv8 đã train
# # model = YOLO("runs/detect/train/weights/best.pt")

# # # Tạo thư mục lưu ảnh nếu chưa có
# # output_dir = Path("output_images")
# # output_dir.mkdir(parents=True, exist_ok=True)


# # # Định nghĩa thư mục chứa ảnh để FastAPI có thể phục vụ ảnh
# # app.mount("/output_images", StaticFiles(directory="output_images"), name="output_images")

# # @app.post("/detect/")
# # async def detect_pipe(file: UploadFile = File(...)):
# #     # Đọc ảnh từ file upload
# #     contents = await file.read()
# #     nparr = np.frombuffer(contents, np.uint8)
# #     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# #     # Chạy mô hình YOLOv8
# #     results = model(img)

# #     # Đếm số lượng ống nước
# #     pipe_count = 0

# #     # Vẽ bounding box lên ảnh
# #     for r in results:
# #         pipe_count += len(r.boxes)  # Đếm số lượng ống nước
# #         for box in r.boxes:
# #             x1, y1, x2, y2 = map(int, box.xyxy[0])
# #             cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

# #     # Lưu ảnh kết quả
# #     output_filename = file.filename
# #     output_path = output_dir / output_filename
# #     cv2.imwrite(str(output_path), img)

# #     # Trả về URL có thể truy cập được từ trình duyệt
# #     image_url = f"http://127.0.0.1:8000/output_images/{output_filename}"
# #     print(image_url)

# #     return {"message": "Detection complete", "image_url": image_url, "pipe_count": pipe_count}


# # # Chạy server FastAPI
# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(app, host="0.0.0.0", port=8000)



# import cv2
# import numpy as np
# from ultralytics import YOLO

# # Thay IP của ESP32-CAM nếu cần
# ESP32_STREAM_URL = "http://172.20.10.2:81/stream"

# # Load mô hình YOLOv8 đã train
# model = YOLO("runs/detect/train/weights/best.pt")

# def detect_pipes(frame):
#     """Nhận diện ống nước trong ảnh bằng YOLOv8"""
#     results = model(frame)

#     pipe_count = 0

#     for r in results:
#         pipe_count = len(r.boxes)  # Đếm số lượng ống nước
#         for box in r.boxes:
#             x1, y1, x2, y2 = map(int, box.xyxy[0])
#             cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
    
#     return pipe_count, frame

# # Mở luồng video từ ESP32-CAM
# cap = cv2.VideoCapture(ESP32_STREAM_URL)

# if not cap.isOpened():
#     print("❌ Không thể kết nối tới ESP32-CAM")
#     exit()

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         print("❌ Không lấy được dữ liệu từ ESP32-CAM")
#         break

#     count, processed_frame = detect_pipes(frame)

#     # Hiển thị số lượng ống nước trên ảnh
#     cv2.putText(processed_frame, f"Ống nước: {count}", (10, 50), 
#                 cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

#     # Hiển thị ảnh
#     cv2.imshow("ESP32-CAM - Phát hiện ống nước", processed_frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()

import cv2
import numpy as np
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from ultralytics import YOLO

app = FastAPI()

ESP32_STREAM_URL = "http://172.20.10.2:81/stream"  # IP của ESP32-CAM
model = YOLO("runs/detect/train/weights/best.pt")
# model = YOLO("C:\Users\Admin\Downloads\runs\content\runs\detect\train\weights\best.pt")

def detect_pipes(frame):
    """Nhận diện ống nước trong ảnh bằng YOLOv8"""
    results = model(frame)

    pipe_count = 0
    for r in results:
        pipe_count = len(r.boxes)
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
    
    cv2.putText(frame, f"Pipes: {pipe_count}", (10, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    return frame

def generate_frames():
    cap = cv2.VideoCapture(ESP32_STREAM_URL)
    if not cap.isOpened():
        print("❌ Không thể kết nối với ESP32-CAM")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Không lấy được dữ liệu từ ESP32-CAM")
            break

        processed_frame = detect_pipes(frame)

        # Encode frame thành JPEG
        _, buffer = cv2.imencode('.jpg', processed_frame)
        frame_bytes = buffer.tobytes()

        # Trả về frame dưới dạng stream
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

