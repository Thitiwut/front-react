import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h4>
        ไม่มีหน้านี้ในระบบ โปรดคลิกด้านล่างเพื่อกลับไปยังหน้าหลัก
      </h4>
      <Link to="/"> กลับหน้าหลัก </Link>
    </div>
  );
};

export default NotFoundPage;
