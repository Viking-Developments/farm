import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {
  Typography,
  Button,
  Card,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { withNamespaces } from 'react-i18next';

import UnlockModal from '../unlock/unlockModal.jsx'
import Store from "../../stores";
import { colors } from '../../theme'

import {
  ERROR,
  CONFIGURE_RETURNED,
  GET_BALANCES,
  GET_BALANCES_RETURNED,
} from '../../constants'

import TypeIt from "typeit-react";
const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  intro: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '400px'
  },
  introCenter: {
    minWidth: '100%',
    textAlign: 'center',
    padding: '48px 0px'
  },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '800px',
    }
  },
  connectContainer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '450',
    }
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#000",
    },
    padding: '12px',
    backgroundColor: "#000",
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
  },
  title: {
    padding: '12px',
    textAlign: 'center'
  },
  subtitle: {
    padding: '12px',
    borderRadius: '0.75rem',
    textAlign: 'center'
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
    whiteSpace: 'nowrap',
    fontSize: '0.83rem',
    textOverflow:'ellipsis',
    cursor: 'pointer',
    padding: '10px 30px',
    borderRadius: '10px',
    border: '1px solid rgb(6 24 49)',
    alignItems: 'center',
    maxWidth: '500px',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  walletAddress: {
    padding: '0px 12px'
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray
  },
  rewardPools: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '20px',
    flexWrap: 'wrap'
  },
  rewardPoolContainer: {
    '&:hover': {
      transition: '1.2s',

    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: '28px 20px',
    borderRadius: '8px',
    border: '1px solid #061831',
    margin: '20px',
    background: colors.white,
    minHeight: '300px',
    minWidth: '200px',
    transition: 'transform 1.2s',
  },
  text: {
    width: '100%',
    color: '#fff',
    minWidth: '100%',
    textAlign:"center"
  },
  poolName: {
    paddingBottom: '20px',
    textAlign:"center",
    color: '#061831',
    fontWeight: '700',
    fontSize: '1.2rem'
  },
  poolName2: {
    color: colors.text
  },
  tokensList: {
    color: colors.darkGray,
    paddingBottom: '20px',
  },
  tokensList2: {
    color: colors.darkGray,
  },
  poolWebsite: {
    color: colors.darkGray,
    paddingBottom: '20px',
    textDecoration: 'none'
  },
  swapHeader: {
    textAlign: 'center',
    color: '#061831',
    fontWeight: '700',
    fontSize: '1.2rem'
  },
  btnStake: {
    '&:hover': {
      background: '#cd7d23',
      color: '#fff',
    },
    display: 'inline-block',
    fontWeight: '400',
    textAlign: 'center',
    verticalAlign: 'middle',    
    userSelect: 'none',
    border: '1px solid #ffb158',
    background: '#ffb158',
    borderRadius: '8px',
    // padding: '.375rem .75rem',
    color: '#fff',
    fontSize: '.9rem',
    lineHeight: '1.6',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '.6rem',
    paddingBottom: '.6rem',
    transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
  },
  addLiquidity: {
    textDecoration: 'none',
    textAlign: 'center',
    background: '#eee',
    color: 'rgb(6, 24, 49)',
    fontWeight: '700',
    borderRadius: '8px',
    fontSize: '.8rem',
    paddingTop: '.2rem',
    paddingBottom: '.2rem',
    paddingLeft: '.2rem',
    paddingRight: '.2rem',
    display: 'flex',
    marginBottom: '1rem',
    boxShadow: 'rgb(213 213 213) 6px 6px 12px, #f2f5f7 -12px -12px 24px -2px',
  },
  psImage: {
    borderRadius: '50%',
    boxShadow: 'rgb(213 213 213) 6px 6px 12px, #f2f5f7 -12px -12px 24px -2px',
    border: '2px solid #061831',
    padding: '.5rem',
    marginBottom: '1rem'
  }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class RewardPools extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const rewardPools = store.getStore('rewardPools')

    this.state = {
      rewardPools: rewardPools,
      loading: !(account && rewardPools),
      account: account,
    }
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  }

  componentWillMount() {
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(GET_BALANCES_RETURNED, this.balancesReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesReturned);
  };

  balancesReturned = () => {
    const rewardPools = store.getStore('rewardPools')
    this.setState({ rewardPools: rewardPools })
  }

  configureReturned = () => {
    this.setState({ loading: false })
  }

  closeAlert = () => {
    this.setState({open: false})
  }

  render() {
    const { classes, t, i18n } = this.props;
    const {
      value,
      account,
      loading,
      modalOpen,
      open
    } = this.state

    var address = null;
    if (account.address) {
      address = account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }

    return (
      <div className={ classes.root }>
        <Typography variant="h2" className={ classes.title }>
          
        </Typography>
       
        <div className={ classes.intro }>
          <Card className={ classes.addressContainer } onClick={this.overlayClicked}>
            <Typography variant={ 'h3'} className={ classes.walletTitle } noWrap>{t('RewardPools.Wallet')}</Typography>
            <Typography variant={ 'h4'} className={ classes.walletAddress } noWrap>{ address }</Typography>
            <div style={{ background: '#DC6BE5', opacity: '1', borderRadius: '10px', width: '10px', height: '10px', marginRight: '3px', marginTop:'3px', marginLeft:'6px' }}></div>
          </Card>
        </div>
        <div className={ classes.rewardPools }> {/*<Typography variant={ 'h3'} className={ classes.text } noWrap>{t('RewardPools.WhichTokens')}</Typography>*/}
          <Typography variant={ 'h3'} className={ classes.text } noWrap>Would you like to <TypeIt
                  options={{
                    loop: true
                  }}
                  getBeforeInit={instance => {
                    instance
                      .options({
                        speed: 150
                      })
                      .type('Stake?')
                      .pause(1500)
                      .options({
                        speed: 30
                      })
                      .delete()

                      .options({
                        speed: 150
                      })
                      .type('Withdraw?')
                      .pause(1500)
                      .options({
                        speed: 30
                      })
                      .delete()

                      .options({
                        speed: 150
                      })
                      .type('Claim Rewards?')
                      .pause(1500)
                      .options({
                        speed: 30
                      })
                      .delete()
                    return instance;
                  }}
                /></Typography>
          {
            this.renderRewards()
          }
        </div>
        { modalOpen && this.renderModal() }
      </div>
    )
  }

  renderRewards = () => {
    const { rewardPools } = this.state

    return rewardPools.map((rewardPool) => {
      return this.renderRewardPool(rewardPool)
    })
  }

  renderRewardPool = (rewardPool) => {

    const { classes, t } = this.props

    let tokensList = rewardPool.tokens.map((rp) => { return rp.symbol }).join(', ')
    if(tokensList.length > 2) {
      tokensList = (tokensList + ' ...')
    }

    return (<div className={ classes.rewardPoolContainer} key={ rewardPool.id } >
      <div className={ classes.psImage }>
        <img
          alt=""
          src={ require('../../assets/'+rewardPool.image+'.png') }
          height="50px"
          width="65px"
          />
      </div>
      <Typography variant='h3' className={ classes.poolName }>{ rewardPool.id }</Typography>
      <a href={ rewardPool.link } className={ classes.addLiquidity } target="_blank"> 
        <span><AddCircleIcon style={{ marginTop: 5, textAlign: 'center', }} /></span> 
        <span style={{ marginTop: 10, }} >{ rewardPool.website }</span> 
      </a>
      {/* <Typography variant='h5' className={ classes.poolWebsite }> <AddCircleIcon /> <a href={ rewardPool.link } target="_blank">{ rewardPool.website }</a></Typography> */}
      <Typography varian='h4' className={ classes.tokensList } align='center'>
        { rewardPool.tokens.length > 0 && `${t('RewardPools.SupportedTokens')}: ` + tokensList  }
        { rewardPool.tokens.length == 0 && t('RewardPools.NoSupportedTokens')  }
      </Typography>
      <Button
        className={ classes.btnStake }
        onClick={ () => { if(rewardPool.tokens.length > 0) { this.navigateStake(rewardPool) } } }
      >
        <Typography variant={ 'h4'}>{t('RewardPools.Open')}</Typography>
      
      </Button>
      <Typography varian='h4' className={ classes.tokensList2 } align='center'>Total rewards claimed: </Typography>
      <Typography style={{marginBottom:"10px"}} variant='h4' className={ classes.poolName2 }>{ rewardPool.tokens[0].rewardsClaimed } xBSE</Typography>
    </div>)
  }

  navigateStake = (rewardPool) => {
    store.setStore({ currentPool: rewardPool })

    this.props.history.push('/stake')
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(RewardPools)));
