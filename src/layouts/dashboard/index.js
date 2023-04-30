/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect, useCallback } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Transactions from "layouts/dashboard/components/Transactions";
import TransactionsOverview from "layouts/dashboard/components/TransactionsOverview";

// Alchemy SDK
import { Alchemy, Network } from "alchemy-sdk";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;
  // ETH Block
  const [block, setBlock] = useState({
    number: 0,
    timestamp: 0,
    hash: "",
    nonce: "",
    size: 0,
    difficulty: 0,
    gasLimit: 0,
    gasUsed: 0,
    miner: "",
    transactions: [],
    value: 0,
  });
  const [activeTransaction, setActiveTransaction] = useState("");
  const handleSetActiveTransaction = useCallback((hash) => {
    // console.log(activeTransaction);
    setActiveTransaction(hash);
  });

  useEffect(() => {
    async function getBlock() {
      const theBlock = await alchemy.core.getBlockWithTransactions();
      setBlock(theBlock);
    }
    getBlock();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="view_in_ar"
                title="Block Number"
                count={block?.number}
                percentage={{
                  color: "success",
                  amount: "Hash: ",
                  label: block?.hash?.slice(-25),
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="event"
                title={new Date(block.timestamp * 1000).toLocaleDateString()}
                count={new Date(block.timestamp * 1000).toLocaleTimeString()}
                percentage={{
                  color: "success",
                  amount: "Miner:",
                  label: block?.miner?.slice(-25),
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="tag"
                title="Transactions"
                count={block?.transactions?.length}
                percentage={{
                  color: "success",
                  amount: block?.size?.toString(),
                  label: block?.nonce,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="fitness_center"
                title="Dificulty"
                count={block?.difficulty?.toString()}
                percentage={{
                  color: "success",
                  amount: block?.gasUsed?.toString(),
                  label: block?.gasLimit?.toString(),
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Transactions
                trx={[block?.transactions]}
                setActiveTransaction={handleSetActiveTransaction}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TransactionsOverview activeTransaction={activeTransaction} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
