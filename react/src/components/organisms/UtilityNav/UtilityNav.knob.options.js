import React from 'react';
import SvgBuilding from '../../atoms/icons/SvgBuilding';
import SvgLogin from '../../atoms/icons/SvgLogin';

export default {
  items: [{
    text: 'State Organizations',
    ariaLabelText: '',
    icon: <SvgBuilding />,
    closeText: 'Close',
    panel: {
      description: {
        text: 'The <a href="#">A-Z Organizations page</a> provides an alphabetical listing of government organizations, including commissions, departments, and bureaus.'
      }
    }
  }, {
    text: 'Log in to...',
    ariaLabelText: 'Log in to the most requested services',
    icon: <SvgLogin />,
    closeText: 'Close',
    panel: {
      description: {
        text: 'These are the top requested sites you can log in to access state provided services'
      },
      links: [{
        text: 'Unemployment Online',
        href: 'https://uionline.detma.org/Claimant/Core/Login.ASPX',
        type: 'external'
      }, {
        text: 'Virtual Gateway (SNAP)',
        href: 'https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2',
        type: 'external'
      }, {
        text: 'Child Support Enforcement',
        href: 'https://ecse.cse.state.ma.us/ECSE/Login/login.asp',
        type: 'external'
      }]
    }
  }]
};
