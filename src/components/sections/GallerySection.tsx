import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Image, ZoomIn } from "lucide-react";

const galleryImages = [
  "https://res.cloudinary.com/dgds0gqq1/image/upload/v1768981001/z7453248302164_e5f968b46f82d98309860e6cf32e4dd4_ekxmip.jpg",
  "https://res.cloudinary.com/dgds0gqq1/image/upload/v1768836140/photo-1-15670390058642013276541_fbcdwr.jpg",
  "https://resource.kinhtedothi.vn/resources2025/1/users/88/7ebc6ebd5a1bc5831a82a769d32e8b8003e03739c368d5d1300c236fc3c770a6-1747014298.png",
  "https://baotanglichsu.vn/DataFiles/News/Tintuc_cgs_vn_201683122h8m25s.jpg",
  "https://res.cloudinary.com/dgds0gqq1/image/upload/v1768981296/z7453275857785_63e0d4c8933140d6b8c4e93371a65ce6_ncivcl.jpg",
  "https://res.cloudinary.com/dgds0gqq1/image/upload/v1768981289/z7453274472936_00015eec9340151996bcac4f8d29ebfe_q5lox9.jpg",
  "https://special.vietnamplus.vn/wp-content/uploads/2023/02/bac-ho-doc-tuyen-ngon.jpg",
  "https://tse3.mm.bing.net/th/id/OIP.8JRZSPl8aq1SwlZhXAtUZgHaFj?w=3150&h=2362&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://photo-cms-plo.epicdn.me/w1966/Uploaded/2023/xqeioxdrky/2022_09_01/anh1-quoc-khanh-di-bat-bien-ung-van-bien-9247.png",
  "https://cdn.luatminhkhue.vn/lmk/articles/88/442239/co-so-hinh-thanh-va-noi-dung-co-ban-tu-tuong-ho-chi-minh-ve-con-nguoi-442239.jpg",
  "https://vanhoavaphattrien.vn/uploads/images/2023/02/10/anh-bac-dinh-1676023260.jpg",
  "https://kinhtevadubao.vn/stores/news_dataimages/hoenh/052023/31/16/ly-luan-ve-thoi-ky-qua-do-len-chu-nghia-xa-hoi-o-viet-nam-tu-di-san-vo-gia-cua-chu-tich-ho-chi-minh-den-ly-luan-sau-sac-cua-tong-bi-thu-nguyen-phu-trong_2.jpg?rt=20230531163300",
];

const GallerySection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="section-alt relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-gold" />
            <Image className="w-4 h-4" />
            Thư viện hình ảnh
            <Image className="w-4 h-4" />
            <span className="w-8 h-0.5 bg-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Chủ nghĩa Xã hội & <span className="text-primary">Hồ Chí Minh</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Những hình ảnh lịch sử ghi dấu chặng đường xây dựng và bảo vệ chủ nghĩa xã hội, 
            cùng tấm gương đạo đức cao đẹp của Chủ tịch Hồ Chí Minh
          </p>
        </motion.div>

        <PhotoProvider
          maskOpacity={0.9}
          bannerVisible={false}
          speed={() => 300}
          easing={(type) => type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'}
          toolbarRender={({ onScale, scale, rotate, onRotate }) => {
            return (
              <div className="flex gap-3 text-white">
                <button 
                  onClick={() => onScale(scale + 0.5)} 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
                >
                  Phóng to +
                </button>
                <button 
                  onClick={() => onScale(scale - 0.5)} 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
                >
                  Thu nhỏ -
                </button>
                <button 
                  onClick={() => onRotate(rotate + 90)} 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
                >
                  Xoay ↻
                </button>
              </div>
            );
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((imageSrc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative"
              >
                <PhotoView src={imageSrc}>
                  <div className="relative cursor-pointer overflow-hidden rounded-xl golden-border aspect-[4/3] bg-card hover:shadow-2xl transition-all duration-300">
                    <img
                      src={imageSrc}
                      alt={`Tư tưởng Hồ Chí Minh về CNXH - Ảnh ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />

                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </PhotoView>
              </motion.div>
            ))}
          </div>
        </PhotoProvider>

        <motion.div
          className="text-center mt-12 space-y-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <ZoomIn className="w-4 h-4" />
            <p className="text-sm italic">
              Click vào ảnh để xem chi tiết và phóng to
            </p>
          </div>
          <p className="text-xs text-muted-foreground/70">
            Sử dụng nút điều khiển để phóng to, thu nhỏ và xoay ảnh
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
