import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import SignatureCanvas from 'react-signature-canvas';

export const Signature = () => {
      const sigRef = useRef();
      const [signature, setSignature] = useState(null);
      const handleSignatureEnd = () => {
        setSignature(sigRef.current.toDataURL());
      }
      const clearSignature = () => {
        sigRef.current.clear();
        setSignature(null);
      }
    
      useEffect(() => {
        console.log(signature);
      }, [signature]);
      return <div>
        <SignatureCanvas 
          penColor="blue"
          canvasProps={{className: 'signature'}}
          ref={sigRef}
          onEnd={handleSignatureEnd}
        />
        <button onClick={clearSignature}>Clear</button>
      </div>
}