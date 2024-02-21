"use client";

import { ThemeProvider } from "next-themes";
import { ConfigProvider } from "antd";

const colors = {
  primary: "#121316",
  primaryHover: "#1D1F24",
  primaryDisabled: "#EFEFF1",
  secondary: "#B7DDFF",
  error: "#EA202B",
  inputPlaceholder: "#838795",
  formInputBackground: "#FAFAFA",
  formRequiredMark: "#D51E27",
};

const AppProvider = ({ children, fontFamily }) => {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <ConfigProvider
        theme={{
          token: {
            fontFamily,
            colorPrimary: colors.primary,
            colorPrimaryHover: colors.primaryHover,
            colorError: colors.error,
          },
          components: {
            Button: {
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
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
