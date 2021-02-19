const primaryColor = {
    main: "#303030"//"#273a4a",
};

/* Menu itens */

// Border
export const primaryBorderColor = "#233341";

// Buttons
export const primaryButtonColor = "#FFFFFF";
export const primaryButtonHover = "#293846";

export const styleTheme = {
  palette: {
      type: "light",
      primary: primaryColor,
      paper: {
        color: primaryButtonColor,
      }
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: primaryColor.main,
        color: primaryButtonColor,
        "& .MuiListItemIcon-root": {
          color: "inherit",
        },
        "& .MuiDivider-root": {
          backgroundColor: primaryBorderColor,
        },
        "& .MuiIconButton-label": {
          color: primaryButtonColor
        },
        "& .MuiListItem-button:hover": {
          backgroundColor: primaryBorderColor
        },
        "& .MuiListItem-root": {
          size: 10
        },
      }
    }
  }
};  

export const themeType = {
  dark: 'dark',
  light: 'light'
}