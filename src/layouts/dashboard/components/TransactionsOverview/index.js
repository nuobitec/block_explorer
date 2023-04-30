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
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

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

function TransactionsOverview(props) {
  const { activeTransaction } = props;
  const [transactionDetail, setTransactionDetail] = useState({
    to: "",
    from: "",
    contractAddress: "",
    transactionIndex: 0,
    gasUsed: 0,
    status: 0,
    confimations: 0,
    type: 0,
    transactionHash: "",
  });

  useEffect(async () => {
    const theTx = await alchemy.core.getTransactionReceipt(activeTransaction);
    setTransactionDetail(theTx);
    console.log(transactionDetail);
  }, [activeTransaction]);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Transaction overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {transactionDetail.status}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="vpn_key"
          title="Hash"
          dateTime={transactionDetail.transactionHash}
        />
        <TimelineItem
          color="error"
          icon="tag"
          title="Index"
          dateTime={transactionDetail.transactionIndex}
        />
        <TimelineItem
          color="success"
          icon="bar_chart"
          title="Status"
          dateTime={transactionDetail.status}
        />
        <TimelineItem color="info" icon="category" title="Type" dateTime={transactionDetail.type} />
        <TimelineItem
          color="warning"
          icon="recommended"
          title="Confirmations"
          dateTime={transactionDetail.confirmations}
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default TransactionsOverview;
