const UserMemberId = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full tw-relative">
        <section>
          <span className="tw-text-xxl tw-font-medium">会員ID</span>
        </section>
        <section className="tw-absolute tw-top-1/2 tw-translate-y-[-50%]">
          <div className="tw-flex tw-flex-col tw-gap-6 tw-items-center">
            <section className="tw-px-8">
              <p>
                入店の際にはこの会員QRコードを店舗端末にかざしてください。またはピンコードの入力で入店も可能です。
              </p>
            </section>
            <section>QR CODE</section>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserMemberId;
