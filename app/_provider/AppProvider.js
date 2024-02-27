"use client";

import { ThemeProvider } from "next-themes";
import { ConfigProvider } from "antd";
import "dayjs/locale/ja";
import locale from "antd/locale/ja_JP";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.locale("ja");
dayjs.extend(updateLocale);
dayjs.updateLocale("ja", {
  weekStart: 1,
});

const colors = {
  primary: "#121316",
  primaryHover: "#1D1F24",
  primaryDisabled: "#EFEFF1",
  secondary: "#B7DDFF",
  textSecondary: "#1890FF",
  error: "#EA202B",
  inputPlaceholder: "#838795",
  formInputBackground: "#FAFAFA",
  formRequiredMark: "#D51E27",
  headerBg: "#232429",
};

const AppProvider = ({ children, fontFamily }) => {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            fontFamily,
            colorPrimary: colors.primary,
            colorPrimaryHover: colors.primaryHover,
            colorError: colors.error,
          },
          components: {
            Button: {
              defaultActiveBorderColor: colors.secondary,
              defaultHoverBorderColor: colors.secondary,
              defaultHoverColor: colors.textSecondary,
              defaultActiveColor: colors.textSecondary,
              colorBgContainerDisabled: colors.primaryDisabled,
              colorTextDisabled: "#BABCC4",
              borderRadius: 8,
              controlHeight: 48,
            },
            Form: {
              labelColor: colors.primary,
              labelHeight: 22,
              verticalLabelPadding: "0 0 8px 0",
              itemMarginBottom: 16,
              labelRequiredMarkColor: colors.formRequiredMark,
            },
            Input: {
              controlHeight: 46,
              fontSize: 14,
              colorBgContainer: colors.formInputBackground,
              colorTextPlaceholder: colors.inputPlaceholder,
            },
            DatePicker: {
              controlHeight: 46,
              colorBgContainer: colors.formInputBackground,
              colorTextPlaceholder: colors.inputPlaceholder,
            },
            Layout: {
              headerBg: colors.headerBg,
              siderBg: colors.headerBg,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
