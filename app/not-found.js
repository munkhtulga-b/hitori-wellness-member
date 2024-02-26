"use client";

import { Suspense } from "react";
import { Button, Result } from "antd";
import MainHeader from "./_components/auth/MainHeader";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="tw-flex tw-flex-col">
      <Suspense fallback={<></>}>
        <MainHeader />
      </Suspense>
      <Result
        status="404"
        title="404"
        subTitle="申し訳ありませんが、アクセスしたページは存在しません。"
        extra={
          <Button
            onClick={() => router.push("/")}
            className="tw-w-full"
            type="primary"
          >
            ホームページに戻ります
          </Button>
        }
      />
    </main>
  );
}
