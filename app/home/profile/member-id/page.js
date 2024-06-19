"use client";

// import Image from "next/image";
// import QRCode from "react-qr-code";

const UserMemberId = () => {
  // const base64string =
  //   "iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAAEzElEQVR4Xu2Ry47cQAwD55z//98EfRkglIa2XjYEsMDTSlTvuD5/xXI++AexDSlcjxSuRwrXI4XrkcL1SOF6pHA9UrgeKVyPFK5HCtcjheuRwvVI4XqkcD1SuB4pXI8UrkcK1yOF62lQ+Pn8eSb48P/wZXstvdwYeDeHFIaXGwPv5pDC8HJj4N0cUhhebgy8m0MKw8uNgXdz9CvEcQF+2X6R+8swBULLISYuS6FDaDnExGUpdAgth5i4LIUOoeUQE5el0CG0HGLi8rhCmPLwLp/yZYAvh6Y8vAvTHFLoLIemPLwL0xxS6CyHpjy8C9McUugsh6Y8vAvTHFLoLIemPLwL0xyLFQJ8mU8BvgxTHt6FaQ4pdODLMOXhXZjmkEIHvgxTHt6FaQ4pdODLMOXhXZjmkEIHvgxTHt6FaY7FCvmUw7uhKQ/vwjSHFDrd0JSHd2GaQwqdbmjKw7swzSGFTjc05eFdmOaQQqcbmvLwLkxzjCuswC/zKQDLvMunFSYuS6HT5dMKE5el0OnyaYWJy1LodPm0wsRlKXS6fFph4nK/wrnwd+emc4F3c0jh9XQu8G4OKbyezgXezSGF19O5wLs5pPB6Ohd4N0eDwrewXyQdPL0KKTzB06uQwhM8vQopPMHTq5DCEzy9igaF9ouQr8OngL1GunaBLHNsnSTUheUWpNDB1klCXVhuQQodbJ0k1IXlFqTQwdZJQl1YbkEKHWydJNSF5RYaFIawvyr9C22dBMuUSpczcVkKHSpdzsRlKXSodDkTl6XQodLlTFyWQodKlzNxuV8h/y9hWgm/DFPAXrvfBWydBMsdSKET3KbYOgmWO5BCJ7hNsXUSLHcghU5wm2LrJFjuQAqd4DbF1kmw3MHLCmEawn6g+8FbfTz20BcpbOaxh75IYTOPPfRFCpt57KEvUtjMYw996VcI2M9HfqFd6FoG+HJlCsByqHsTKXSWK1MAlkPdm0ihs1yZArAc6t5ECp3lyhSA5VD3JlLoLFemACyHujcZVziH/SLk6/Apxx4nwfI8UniNPU6C5Xmk8Bp7nATL80jhNfY4CZbnkcJr7HESLM/ToND+jKHwd0NTgC+HpjzQbUEKD3w5NOWBbgtSeODLoSkPdFuQwgNfDk15oNuCFB74cmjKA90W+hXiuEDlsv1891M5Bd0HkEInlVPQfQApdFI5Bd0HkEInlVPQfQApdFI5Bd0HGFdofyQJ78IUsNdIsPw/dp+ksZtDCh3sPkljN4cUOth9ksZuDil0sPskjd0cUuhg90kauzkWK7T1+8swrWCfvh+8lUIKq9in7wdvpZDCKvbp+8FbKaSwin36fvBWCimsYp++H7yVYrHCCpXLb3V/IYXhy291fyGF4ctvdX8hheHLb3V/IYXhy291fzGusAK/DFO+zLF1cio05cstSOHB1smp0JQvtyCFB1snp0JTvtyCFB5snZwKTflyC1J4sHVyKjTlyy30K5zL3LtwmWPrJFgeQApP4DLH1kmwPIAUnsBljq2TYHkAKTyByxxbJ8HyAFJ4Apc5tk6C5QEaFIp3kcL1SOF6pHA9UrgeKVyPFK5HCtcjheuRwvVI4XqkcD1SuB4pXI8UrkcK1yOF65HC9UjheqRwPVK4HilcjxSu5x939pjKEEUvzwAAAABJRU5ErkJggg==";

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full tw-relative">
        <section>
          <span className="tw-text-xxl tw-font-medium">会員ID</span>
        </section>
        <section className="tw-absolute tw-top-1/2 tw-translate-y-[-50%]">
          <div className="tw-flex tw-flex-col tw-gap-6 tw-items-center">
            <section className="tw-size-[220px]">
              {/* <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrCode}
                viewBox={`0 0 256 256`}
              /> */}
              {/* <Image
                src={`data:image/png;base64,${base64string}`}
                alt="qr-code"
                width={250}
                height={250}
              /> */}
            </section>
            <section className="tw-px-8">
              <p>
                入店の際にはこの会員QRコードを店舗端末にかざしてください。またはピンコードの入力で入店も可能です。
              </p>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserMemberId;
