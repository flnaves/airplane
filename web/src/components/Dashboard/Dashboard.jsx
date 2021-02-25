import React from 'react';
import Breadcrumb from '../Header/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { translationEn } from "../../lang/translation";
import { TypesCard } from '../Reports/Types/TypesCard';
import { AirplaneModelCard } from '../Reports/AirplaneModel/AirplaneModelCard';
import { GeographicCard } from '../Reports/Geographic/GeographicCard';
import { Grid } from '@material-ui/core';
import { ContributingFactorsCard } from '../Reports/ContributingFactors/ContributingFactorsCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: translationEn },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

const Dashboard = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Breadcrumb />

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                        <TypesCard t={t} classes={classes} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <AirplaneModelCard t={t} classes={classes} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <GeographicCard t={t} classes={classes} />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <ContributingFactorsCard t={t} classes={classes} />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;