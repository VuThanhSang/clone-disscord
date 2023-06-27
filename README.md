# clone-disscord
## Công nghệ sử dụng

- Front-End: ReactJS
- Back-End: Nodejs, ExpressJs
- Database: MongoDB
- Storage: Cloudinary
## Cài đặt
Để chạy project này, bạn cần cài đặt Nodejs và npm trên máy của bạn. Sau đó, bạn làm theo các bước sau:

Clone project này từ github:``` git clone https://github.com/your-username/discord-clone.git ```
Vào thư mục client và cài đặt các dependency: ``` cd client && npm install ```
Vào thư mục server và cài đặt các dependency:``` cd server && npm install ```
Tạo một file .env trong thư mục server và điền các thông tin sau:
PORT=
MONGODB_URI=''
DATABASE_NAME = Clone-Disscord
APP_HOST = localhost
APP_PORT = 3240
APP_CLIENT_PORT = 3001
JWT_SECRET = UserAuthentication
JWT_REFRESH= UserRefreshKey
GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET = 
GITHUB_CLIENT_ID = 
GITHUB_CLIENT_SECRET =
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
Copy
Chạy server bằng lệnh: npm run dev 
Chạy client bằng lệnh: npm start
Mở trình duyệt và truy cập vào địa chỉ: http://localhost:3001
Chức năng
Project này có các chức năng sau:

Đăng ký và đăng nhập bằng email và mật khẩu
Tạo và tham gia các server
Tạo và xóa các channel trong server
Chat với những người khác trong cùng channel
Gửi hình ảnh và emoji trong chat
Thay đổi avatar và tên hiển thị
## Giao diện 

![h1](https://github.com/VuThanhSang/clone-disscord/assets/87526822/0fb65b64-5019-4747-9acd-93c069393681)

giao diện chính 

![h2](https://github.com/VuThanhSang/clone-disscord/assets/87526822/5031f1c4-671f-48a7-8974-252351e9b239)

giao diện voice Chat 

![h3](https://github.com/VuThanhSang/clone-disscord/assets/87526822/5ad4cd4d-440d-4741-885b-821e740c4c22)

giao diện khung chat ở room voiceChat 

![h4](https://github.com/VuThanhSang/clone-disscord/assets/87526822/831a8be1-de94-4ebb-be1e-e29d8d5da470)

giao diện setting  

![h5](https://github.com/VuThanhSang/clone-disscord/assets/87526822/3a4fcff7-27f9-4db7-9b1a-55cf664e3bf2)

giao diện tạo channel

![h6](https://github.com/VuThanhSang/clone-disscord/assets/87526822/7709c6b6-5ec0-45ee-87e1-5a0f97404f87)

giao diện tạo server 
