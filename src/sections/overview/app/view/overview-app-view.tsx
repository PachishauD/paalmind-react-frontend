// @mui
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Skeleton } from '@mui/material';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
//
import axios from 'axios';
import AppWidget from '../app-widget';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppNewInvoice from '../app-new-invoice';
import AppTopAuthors from '../app-top-authors';
import AppTopRelated from '../app-top-related';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
import AppTopInstalledCountries from '../app-top-installed-countries';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  // const { user } = useMockedUser();
  const user = {
    name: "Steven",
    email: "paalmind@gmail.com",
    displayName: "steven(Admin)"
  }
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const theme = useTheme();

  const settings = useSettingsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https:///b630-34-135-72-108.ngrok-free.app/customers', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get('https:///b630-34-135-72-108.ngrok-free.app/transactions', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (users.length === 0) {
      setUsersLoading(true);
    } else {
      setUsersLoading(false);
    }
    if (transactions.length === 0) {
      setTransactionsLoading(true);
    } else {
      setTransactionsLoading(false);
    }
  }, [users, transactions]);

  const numUsers = users.length;
  const numTransactions = transactions.length;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.displayName[0].toUpperCase()}${user?.displayName.slice(1)}`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Go Now
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Users"
            percent={0.1}
            total={usersLoading? <Skeleton width={100}/> : numUsers}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Transactions"
            percent={0.2}
            total={transactionsLoading? <Skeleton width={100}/> : numTransactions}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Profits"
            percent={0.0}
            total={0}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }}
            unit="$"
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Bets Stats"
            chart={{
              series: [
                { label: 'Won', value: 10 },
                { label: 'Loss', value: 5 },
                { label: 'Pending', value: 6 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Sport Betting vs Casino Live Status"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2022',
                  data: [
                    {
                      name: 'Sport Betting',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Casino',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2023',
                  data: [
                    {
                      name: 'Sport Betting',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Casino',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={12}>
          <AppNewInvoice
            title="Transactions History"
            tableData={transactions}
            tableLabels={[
              { id: 'username', label: 'Username' },
              { id: 'wallet_address', label: 'Wallet Address' },
              { id: 'hash', label: 'hash' },
              { id: 'type', label: 'type' },
              { id: 'amount', label: 'amount' },
              { id: 'token', label: 'token' },
              { id: 'timestamp', label: 'timestamp' },
              { id: '' },
            ]}
            transactionsLoading={transactionsLoading}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Top Related Applications" list={_appRelated} />
        </Grid> */}

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={3}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
