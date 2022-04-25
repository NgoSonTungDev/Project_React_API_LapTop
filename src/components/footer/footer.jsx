import React from "react";
import "./footer.scss";

const anhiconne =  ['https://cdn-icons-png.flaticon.com/128/2111/2111463.png','https://cdn-icons-png.flaticon.com/128/1384/1384053.png','https://cdn-icons-png.flaticon.com/128/1384/1384060.png','https://cdn-icons-png.flaticon.com/128/2111/2111450.png','https://stc-zaloprofile.zdn.vn/pc/v1/images/zalo_sharelogo.png']

const Footer = () => {
  return (
    <div className="footer-bottom">
      <div className="footer1">
        <h4>Thông tin chung</h4>
        <ul>
          <li>Giới thiệu về công ty</li>
          <li>Tin tuyển dụng</li>
          <li>Góp ý</li>
          <li>Tin tức</li>
        </ul>
      </div>
      <div className="footer1">
        <h4>Chi nhánh</h4>
        <ul>
          <li>113ABC.Thanh kê , TP Đà Nẵng</li>
          <li>178ABC.Thanh kê , TP Đà Nẵng</li>
          <li>156ABC.Thanh kê , TP Đà Nẵng</li>
        </ul>
      </div>
      <div className="footer1">
        <h4>Liên hệ</h4>
        <div className="icon-img">
          <a href="https://www.youtube.com/" target='_blank'><img src={anhiconne[0]} alt="" /> </a>
          <a href="https://www.facebook.com/sontung0309/" target='_blank'><img src={anhiconne[1]} alt="" /> </a>  
          <a href="https://www.youtube.com/" target='_blank'><img src={anhiconne[2]} alt="" /> </a>         
          <a href="https://www.youtube.com/" target='_blank'><img src={anhiconne[3]} alt="" /> </a>         
          <a href="https://www.youtube.com/" target='_blank'><img src={anhiconne[4]} alt="" /> </a>         
        </div>
      </div>
      <i>Design by Son Tung</i>
    </div>
  );
};

export default Footer;
