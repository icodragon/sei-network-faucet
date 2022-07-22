import HCaptcha from '@hcaptcha/react-hcaptcha';
import {useRef, useState} from "react";


function App() {
  const [captcha, setCaptcha] = useState('');
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('')

  const inputRef = useRef(null);

  const handleClick = async event => {
      event.preventDefault();

      const params = new URLSearchParams();
      params.append('address', inputRef.current.value);
      params.append('token', captcha)

      const response = await fetch('http://localhost:8080/api/claimTokens', {
          method: 'POST',
          body: params,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      });


      const json = await response.json();
      console.log(json);

      if (response.status === 401) {
          setStatus('Error')
          setStatusMessage("Error captcha");
          return;
      }

      if (response.status === 402) {
          setStatus('Error')
          setStatusMessage('You have already claimed tokens');
          return;
      }
      setStatus('OK');
      setStatusMessage('Success!');
  };

  async function onVerifyCaptcha(token) {
      setCaptcha(token);
  }

  return (
    <div className="container">
        {
            <div className={ (status === 'OK') ? 'alarm success' : status !== '' ? 'alarm error' : 'alarm__hide'}>
                {statusMessage}
            </div>
        }

      <main className="main">
          <div className="wrapper__title">
              <h1>Sei-network faucet</h1>
              <h2>Faucet: atlantic-1</h2>
          </div>
          <form action="">
              <div className="wrapper__wallet">
                  <input
                      type="text"
                      placeholder="Enter your address"
                      ref={inputRef}
                  />
              </div>
              <div className="wrapper__claim">
                  <div className="captcha">
                      <HCaptcha sitekey="8cc41448-0666-47c2-ae31-be4ea1263aab" onVerify={onVerifyCaptcha}/>
                  </div>
                  <button onClick={handleClick}>Claim</button>
              </div>
          </form>
      </main>

      <footer className="footer">
          Powered by icodragon [NODERS]#4560
      </footer>
    </div>
  );
}

export default App;
