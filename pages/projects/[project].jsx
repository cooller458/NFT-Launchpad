import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import {
Button, Grid, GridItem, Link, Text, 
Container, HStack, Image, Box,
TableContainer, Table, Thead, Tr, Th, Tbody, Td,
NumberInput, NumberInputField, NumberInputStepper,
VStack, useDisclosure, Modal, ModalOverlay,
ModalContent, ModalHeader, ModalFooter,
ModalBody, ModalCloseButton, Input, Switch
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'

import Twitter from '../../assets/icons/twitter.png'
import Discord from '../../assets/icons/discord.png'
import Website from '../../assets/icons/click.png'


import { networkParams } from "../../components/Utils/Networks";
import { BigNumber, ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../../components/Utils/providerOptions";
import { getAddress } from 'ethers/lib/utils'



const Project = function (props) {

  // console.log(props.transactions)
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [isError, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const [tMinted, setTMinted] = useState(0);
  const [toMint, setToMint] = useState(0);

  const [buttonLoading, setButtonLoading] = useState(false);


  const factoryAddress = "0xC3a0Db8dc25E9Bee442124bf4D3d03f2F96AE0Cb"; // Without Fee - for testing
  const router = useRouter();


  const [apiTransactions, setApiTransactions] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    tokenName: '',
    tokenSymbol: '',
    tokenBanner: '',
    tokenAddress: '',
    projectDescription: '',
    owner: '',
    website: '',
    twitter: '',
    discord: '',
    mintedSupply: '',
    revealed: false
   });


  const [newProjectDetails, setNewProjectDetails] = useState({
    isPaused: false,
    batchMint: "",
    newBaseUri: '',
    newNotRevealedUri: '',
    block: "",
    mintPrice: '',
    newOwner: '',
    newBannerUrl: '',
    isRevealed: false
   });

   const setNewPrice = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const _abi = ["function setCost(uint256 _cost) public onlyOwner"];

        const connectedContract = new ethers.Contract(projectDetails.tokenAddress, _abi, signer);
        await connectedContract.setCost(newProjectDetails.mintPrice, {gasLimit:8000000});
    
      } catch (error) {
        setError(error);
      }
    }
   
  };

   const blockAddress = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const _abi = ["function setBlacklistedAddress(address _who) public"];


        const toBlock = ethers.utils.getAddress(newProjectDetails.block);

        const connectedContract = new ethers.Contract(projectDetails.tokenAddress, _abi, signer);
        await connectedContract.setBlacklistedAddress(toBlock.toString(), {gasLimit:8000000});
    
      } catch (error) {
        setError(error);
      }
    }
   
  };


   const setNrURI = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const _abi = ["function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner"];

        const connectedContract = new ethers.Contract(projectDetails.tokenAddress, _abi, signer);
        await connectedContract.setNotRevealedURI(newProjectDetails.newNotRevealedUri, {gasLimit:8000000});
    
      } catch (error) {
        setError(error);
      }
    }
   
  };

   const setBaseURI = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const _abi = ["function setBaseURI(string memory _newBaseURI) public onlyOwner"];

        const connectedContract = new ethers.Contract(projectDetails.tokenAddress, _abi, signer);
        await connectedContract.setBaseURI(newProjectDetails.newBaseUri, {gasLimit:8000000});
    
      } catch (error) {
        setError(error);
      }
    }
   
  };

   const airdropNft = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const _abi = ["function airdropNfts(address airdropWallets) public"];


        const toMint = ethers.utils.getAddress(newProjectDetails.batchMint);

        const connectedContract = new ethers.Contract(projectDetails.tokenAddress, _abi, signer);
        await connectedContract.airdropNfts(toMint.toString(), {gasLimit:8000000});
    
      } catch (error) {
        setError(error);
      }
    }
   
  };

   const pauseSc = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi = ["function pauseTheSmartContract(bool _pause) public onlyOwner"];
        const _scAddress = projectDetails.tokenAddress;
        const connectedContract = new ethers.Contract(_scAddress, abi, signer);
        // console.log("Succes! 1")
        await connectedContract.pauseTheSmartContract(newProjectDetails.isPaused, {gasLimit:8000000});
        // console.log("Succes! 2")
    
      } catch (error) {
        setError(error);
      }
    }
   
  };

  const reveal = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi = ["function reveal() public"];
        const _scAddress = projectDetails.tokenAddress;
        const connectedContract = new ethers.Contract(_scAddress, abi, signer);
        // console.log("Success! 1")
        await connectedContract.reveal({gasLimit:8000000});
        // console.log("Success! 2")
    
      } catch (error) {
        setError(error);
      }
    }
   
  };

  //  const newBannerChangeHandler = (event) => {
  //   setNewProjectDetails({
  //        ...newProjectDetails, // Copy the existing value
  //        newBannerUrl: event.target.value // Override this value
  //     })
  // }

  //  const newOwnerChangeHandler = (event) => {
  //   setNewProjectDetails({
  //     ...newProjectDetails, // Copy the existing value
  //     newOwner: event.target.value // Override this value
  //     })
  // }

   const newPriceChangeHandler = (event) => {
    setNewProjectDetails({
      ...newProjectDetails, // Copy the existing value
      mintPrice: event.target.value // Override this value
      })
  }

   const blockAddressChangeHandler = (event) => {
    setNewProjectDetails({
      ...newProjectDetails, // Copy the existing value
      block: event.target.value // Override this value
      })
  }


   const notRevealedUriChangeHandler = (event) => {
    setNewProjectDetails({
      ...newProjectDetails, // Copy the existing value
      newNotRevealedUri: event.target.value // Override this value
      })
  }

   const newBaseUriChangeHandler = (event) => {
    setNewProjectDetails({
      ...newProjectDetails, // Copy the existing value
      newBaseUri: event.target.value // Override this value
      })
  }

   const batchMintChangeHandler = (event) => {
    console.log(event.target.value);
    setNewProjectDetails({
      ...newProjectDetails, // Copy the existing value
      batchMint: event.target.value // Override this value
      })
  }

   const pauseChangeHandler = (event) => {
    if ( newProjectDetails.isPaused == false ) {
      setNewProjectDetails({
        ...newProjectDetails, // Copy the existing value
        isPaused: true // Override this value
        })
    } else {
      setNewProjectDetails({
        ...newProjectDetails, // Copy the existing value
        isPaused: false // Override this value
        })
    }
    
  }

  const revealChangeHandler = (event) => {
    if ( newProjectDetails.isRevealed == false ) {
      setNewProjectDetails({
        ...newProjectDetails, // Copy the existing value
        isRevealed: true // Override this value
        })
    } else {
      setNewProjectDetails({
        ...newProjectDetails, // Copy the existing value
        isRevealed: false // Override this value
        })
    }
    
  }


   const inputChangeHandler = (event) => {
    setToMint(event.target.value);
  }

   const getMintNft = async () => {
        getApy();
        const iProvider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/7uVt40M_j-gIF7lYsjAgKA69Ah7NDo89");

        const abi = ["function mintNft(uint256 _mintAmount) public payable",
        "function getMintedAmount() public view returns(uint256)"
      ];
      const _scAddress = router.query.address;
        const connectedContract = new ethers.Contract(_scAddress, abi, iProvider);

        let _amount = await connectedContract.getMintedAmount();
              setTMinted(_amount.toString());
   
  };


const getApy = async () => {
  let endBlock = '0';
  let startBlock = '1';

  const providers = ethers.providers;

  const _provider = providers.getDefaultProvider('matic');

  await _provider.getBlockNumber().then(function(blockNumber) {
   endBlock = blockNumber;
   startBlock = endBlock - 1000000;
});


    const key = 'ckey_5ee30b56cd02463583627515b2a';
    const baseURL = 'https://api.covalenthq.com/v1'
    const chainId = '137'
    const address = "0x8a33e477F73D22960D850Ff61FD8C58b3B2E21b3"; // Dummy data

    const url = new URL(`${baseURL}/${chainId}/events/address/${address}/?starting-block=${startBlock}&ending-block=29793247&key=${key}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result?.data?.items;
    console.log(data)
  
    const trs = data?.filter((t) => t.decoded.name.toString().includes(""));
    // const _trs = trs.filter((e,k) => k < 50);
    const __trs = data?.sort((a, b) => (b.block_height - a.block_height))

    
    setApiTransactions(__trs);
    // console.log(data);
    // console.log("Start Block: " + startBlock);
    // console.log("End Block: " + endBlock);

  }

   
   const getProjectDetails = async (index) => {
    getMintNft();
    // if (router.isReady) {
    //   setPid(router.query.id);
    // }

   const iProvider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/7uVt40M_j-gIF7lYsjAgKA69Ah7NDo89");

   const abi = ["function getCollectionProps(uint256 index) public view returns(address, string memory, string memory, string memory, string memory, address, string memory, string memory, string memory, uint256, bool)"];
   const connectedContract = new ethers.Contract(factoryAddress, abi, iProvider);
   
   let _collectionAddress = await connectedContract.getCollectionProps(index);
    console.log(_collectionAddress);
   setProjectDetails(() => {
    return {
      tokenName: _collectionAddress[1],
      tokenSymbol: _collectionAddress[2],
      tokenBanner: _collectionAddress[3],
      tokenAddress: _collectionAddress[0],
      projectDescription: _collectionAddress[4],
      owner: _collectionAddress[5],
      website: _collectionAddress[6],
      twitter: _collectionAddress[7],
      discord: _collectionAddress[8],
      mintedSupply: _collectionAddress[9].toString(),
      revealed: _collectionAddress[10]
    }
   });

}


useEffect(() => {
  if (router.isReady) {
  getProjectDetails(router.query.id);
  getMintNft();
}
  getMintNft();
}, [router.isReady]);


  const mintNft = async () => {
    if (typeof window !== 'undefined'){
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi = ["function mintNft(uint256 _mintAmount) public payable",
        "function getMintedAmount() public view returns(uint256)"
      ];
        const _scAddress = router.query.address;
        const connectedContract = new ethers.Contract(_scAddress, abi, signer);

        let _toMint = toMint.toString();
        let _mintNft = await connectedContract.mintNft(_toMint, {gasLimit:8000000});
       
       
        setButtonLoading(true);
        await _mintNft.wait();
        setButtonLoading(false);
        toast({
          title: 'Great!',
          description: `You minted ${_toMint} ${projectDetails.tokenSymbol} NFTs!`,
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
        
        // let _amount = await connectedContract.getMintedAmount();
        //       setTMinted(_amount.toString());
        //       console.log(_amount.toString())
        getMintNft();
        console.log(_mintNft);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_mintNft.hash}`);
        setTransactionNft(`https://rinkeby.etherscan.io/tx/${_mintNft.hash}`);

      } catch (error) {
        setError(error);
      }
    }
   
  };


  const connectWallet = async () => {
    if (typeof window !== 'undefined'){
      try {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });

        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);


      } catch (error) {
        setError(error);
      }
    }
   
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
      
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
   
  };

  const disconnect = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    if (web3Modal.cachedProvider) {
      connectWallet();
     
    }
  }, []);

  useEffect(() => {
      
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {

    if (window.ethereum){
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else {
      setProvider(providerOptions.walletconnect)
    }
}, []);

   
  return (
    
   <><Container maxW={'100%'} align='center' py={4} bgColor='#e0e0eb'> 
       {account === projectDetails.owner ? (
        <Box bgGradient='linear(to-r, #141E30, #243B55)' 
          py='3' 
          mb={'4'} 
          borderRadius='10'
          color={'white'}
          boxShadow='md' onClick={onOpen}>
<Text as={'b'}><Link onClick={onOpen}>Manage Collection</Link></Text></Box>
) : null}

     <Grid
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4} 
  color='white'
>
    <GridItem colSpan={['5', '5', '4', '4', '4']} height={['400', '400', '275', '300', '335']}
    bgGradient='linear(to-r, #141E30, #243B55)' 
    bgPosition={'center'}
    bgSize={['400%', '200%', '200%', '200%', '100%']}
    borderRadius='lg'
    bgImg={projectDetails.tokenBanner}
    bgRepeat="no-repeat"
    p={6} />

    <GridItem rowSpan={['20', '20', '2', '2', '2']} 
    colSpan={['5', '5', '1', '1', '1']} 
    bgGradient='linear(to-r, #141E30, #243B55)'
    borderWidth='1px' 
    borderRadius='lg'
    p={6} maxH='700' overflowY={'scroll'}
    >

    <Text><b>Transactions</b></Text>
        <Text>Last Recorded Transactions</Text>
        <TableContainer>
  <Table variant='simple' size='sm' mt={4}>
    <Thead textAlign={'left'}>
      <Tr>
        <Th>Event</Th>
        <Th>Tx. Hash</Th>
      </Tr>
    </Thead>
    <Tbody>
    {apiTransactions && apiTransactions.map((t) => {
      {/* console.log(t); */}
         let _data = t.decoded.name;
         let _tx = t.tx_hash;
        {/* console.log(t[0][index].decoded.name); */}
          return (
             <>
    <Tr>
        <Td>{_data}</Td>
        <Td><Link href={`https://www.polygonscan.com/tx/${_tx}`} target='_blank'>
        <Button width={20} height={5} bg='black'
        _hover={{bgColor: "grey", color: "white"}}><Text fontSize={'10px'}>View</Text></Button>
        </Link></Td>
      </Tr>
      </>
             )
       })}
    </Tbody>
  </Table>
</TableContainer>

    </GridItem>

  

    <GridItem 
    colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' 
    p={6}>
    
        <HStack mb={5}>
                <Text mr={3} fontSize={'2xl'}><b>{projectDetails.tokenName}</b></Text>
               <Box  bgGradient='linear(to-l, #7928CA, #FF0080)' py={2} px={4} color='white' borderRadius='lg'>
               <HStack>
                <a href={projectDetails.twitter} target='_blank' rel="noreferrer" ><Image src={Twitter.src} alt='Twitter' w={3}/></a>
                <Text>|</Text>
                <a href={projectDetails.discord} target='_blank' rel="noreferrer" ><Image src={Discord.src} alt='Discord' w={3}/></a>
                <Text>|</Text>
                <a href={projectDetails.website} target='_blank' rel="noreferrer" ><Image src={Website.src} alt='Website' w={3}/></a>
                </HStack>
                </Box>
            </HStack>
        <Text noOfLines={['5', '5', '5', '7', '9']} fontSize={15} textAlign='left'>{projectDetails.projectDescription}</Text>

    </GridItem>


    <GridItem colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' align={'center'}>

{!account ? (<><VStack py={'17%'}><Button
              onClick={connectWallet}
              variant={'solid'}
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={40}
               >
             <b>Connect Your Wallet & Mint</b>
            </Button></VStack></>): (<><VStack py={'7.5%'} gap={3} justify={'center'}>
            <Text fontSize={'2xl'}><b>Mint Your {projectDetails.tokenSymbol} NFT</b></Text>
            <NumberInput step={1} defaultValue={"0"} min={0}
                focusBorderColor = "white"
                textColor={'white'} size='lg' maxWidth={'50%'}>
             <NumberInputField value={0} onChange={inputChangeHandler} />
              <NumberInputStepper>

              </NumberInputStepper>
            </NumberInput>

            {buttonLoading === true ? (<Button
              isLoading
              loadingText='Minting...'
              variant={'solid'}
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               />) :( <Button
              onClick={mintNft}
              variant={'solid'}
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Mint Now!</b>
            </Button>)}
           
            
            </VStack></>)}
            <Text mb={7}>{tMinted} / {projectDetails.mintedSupply} Minted</Text>
    </GridItem>
</Grid>
</Container>

<Modal isOpen={isOpen} onClose={onClose} isCentered  size={'2xl'} >
        <ModalOverlay />
        <ModalContent bgColor='#ededed'>
          <ModalHeader>Manage Your Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(2, 1fr)' gap={2}>

              <GridItem w='100%'>
                <Text mt='30px'><b>Airdrop (1 NFT)</b></Text>
                <Input placeholder='Address' mt='10px' bg='white' 
                  onChange={batchMintChangeHandler}
                />
                <Button
              onClick={airdropNft}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>New Base URI</b></Text>
                <Input placeholder='Pinata IPFS Link' mt='10px' bg='white' 
                  onChange={newBaseUriChangeHandler}
                />
                <Button
              onClick={setBaseURI}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>New Not-Revealed URI</b></Text>
                <Input placeholder='Pinata IPFS Link' mt='10px' bg='white' 
                  onChange={notRevealedUriChangeHandler}
                />
                <Button
              onClick={setNrURI}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Block Addresses</b></Text>
                <Input placeholder='Address' mt='10px' bg='white' 
                  onChange={blockAddressChangeHandler}
                />
                <Button
              onClick={blockAddress}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Mint Price (MATIC)</b></Text>
                <Input placeholder='200' mt='10px' bg='white' 
                  onChange={newPriceChangeHandler}
                />
                <Button
              onClick={setNewPrice}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem>

              {/* <GridItem w='100%'>
                <Text mt='30px'><b>Transfer Ownership</b></Text>
                <Input placeholder='New Owner: Address' mt='10px' bg='white' 
                  onChange={newOwnerChangeHandler}
                />
                <Button
              onClick={mintNft}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem> */}

              {/* <GridItem w='100%'>
                <Text mt='30px'><b>Banner Image</b></Text>
                <Input placeholder='www.example.com/image.png' mt='10px' bg='white' 
                  onChange={newBannerChangeHandler}
                />
                <Button
              onClick={mintNft}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button>
              </GridItem> */}
              <GridItem />
              <GridItem w='100%'><VStack align='left'>
                <Text mt='30px' mb='2'><b>Pause Mint?</b></Text>
                <Switch size='lg' onChange={pauseChangeHandler} /> 
                <Button
              onClick={pauseSc}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'20'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button></VStack>
              </GridItem>

              {projectDetails.revealed === false ? (<GridItem w='100%'><VStack align='left'>
                <Text mt='30px' mb='2'><b>Reveal?</b></Text>
                <Switch size='lg' onChange={revealChangeHandler} /> 
                <Button
              onClick={reveal}
              variant={'solid'}
              size='xs'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'20'}
              mt={6}
              fontSize={11}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10} >Do Action</Button></VStack>
              </GridItem>): null}


            </Grid>
          </ModalBody>
          <ModalFooter>
          <Button onClick={onClose} width={'20%'} bgGradient='linear(to-l, #7928CA, #FF0080)' color={'white'} _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default Project
