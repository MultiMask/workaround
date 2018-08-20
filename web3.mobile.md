# concept of dapp mobile interapp protocol(web3.mobile)
the protocol describes the concept of communication between the dapp frontend(SourceApp) and multimask mobile(multimask)
In the role of the frontend of dapp can act as a web application or mobile  application.

```
multimask://x-callback-url/web3?
   x-success=sourceapp://x-callback-url/signedMsg&
   x-source=SourceApp&
   x-error=sourceapp://x-callback-url/authError&
   api=get_adr&
```
When the URL is opened, iOS will launch multimask, and pass the URL as arguments. Mmm will parse the URL, identify the action requested, and sign address of user wallet as passed in the parameters. The “get_adr” action and it’s parameters are is part of the protocol (the specification is not yet complete). If the user has allowed to transfer the address to the SourceApp, it will then call the URL in the x-callback parameter to return the result parameters(1) to SourceApp .
```
return {
        message: serializeMessage(adr),
        v: signature.v,  
        r: signature.r,   
        s: signature.s   
    }
```
Return signature as three values: v, r, s . These values are enough to 'recover' public key for checking signer address.

Source app use the procedure of address recovery
```
static recover(message, v, r, s) {

        // Calculate SHA3 hash of the message
        const messageHash = ethUtil.sha3(message)
    
        const signature = Buffer.concat([r, s])

        // Recover public key of signer
        const publicKey = secp256k1.recover(messageHash, signature, v - 27, false)
    
        // Get signer address from public key
        return ethUtil.sha3(publicKey.slice(1)).slice(-20)
    }
```
Fulfillment of the condition
```
deserializeMessage(message) == recover(message, v, r, s)
```
is an undeniable proof of possession of the address.

The procedure for signing appeals to the contract methods is similar. The wallet as a return parameter returns a signed tx, which is pushed into the blockchain by SourceApp.