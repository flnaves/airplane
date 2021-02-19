import React from 'react';
import clsx from "clsx";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Route } from 'react-router-dom';
import { Box, useTheme } from '@material-ui/core';
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { translationBr } from "../../lang/translation";
import { themeType } from '../../config/theme';

i18n.use(initReactI18next).init({
    resources: {
      ptbr: { translation: translationBr },
    },
    lng: "ptbr",
    fallbackLng: "ptbr",
    interpolation: { escapeValue: false },
});

const useStyles = makeStyles((theme) => ({
    lightLik: {
        color: '#c3c8ca'
    },
    darkLink: {
        color: 'rgb(78 78 78)'
    }
}));

const Breadcrumb = () => {
    const { t } = useTranslation();

    const classes = useStyles();
    const theme = useTheme();

    return  (
        <Route>
            {({ location }) => {
                const pathnames = location.pathname.split('/').filter(x => x);
                return (
                    <Box component="div" p={3}>
                        <Breadcrumbs aria-label="Breadcrumb">
                            <Link 
                                className={clsx({
                                    [classes.darkLink] : theme.palette.type === themeType.light,
                                    [classes.lightLik] : theme.palette.type === themeType.dark
                                })} to="/">
                                {t('dashboard')}
                            </Link>
                            {pathnames.map((value, index) => {
                                const last = index === pathnames.length - 1;
                                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                                return last ? (
                                    <Typography color="textPrimary" key={to}>
                                        <strong>{t(value)}</strong>
                                    </Typography>
                                ) : (
                                    <Link 
                                        className={clsx({
                                            [classes.darkLink] : theme.palette.type === themeType.light,
                                            [classes.lightLik] : theme.palette.type === themeType.dark
                                        })}
                                        to={to} 
                                        key={to}>
                                        {t(value)}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Box>
                );
            }}
        </Route>
    );
}

export default Breadcrumb;