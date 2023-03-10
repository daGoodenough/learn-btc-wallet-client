import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signup } from "../auth/authSlice";
import { changeLearnModal } from "../learn/learnSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);

  const handleContinueAsGuest = () => {
    const random = Math.round(Math.random() * 1000000);
    dispatch(signup(
      {
        email: random + '@bitcoin.com',
        username: 'guest' + random,
        password: 'bitcoin'
      }, () => navigate('/learn')
    ))
  }

  if (username) {
    return (
      <header >
        {/* <h2>Welcome, {username}, to the wallet that <strong>helps you understand</strong>!</h2>
        <h3>Most elements of the wallet can be <strong>clicked</strong> to <em>learn more</em></h3>
        <h4><strong>DISCLAIMER**</strong> Do not use any addresses, or key pairs to interact with <em>real</em> bitcoin</h4> */}
      </header>
    );
  }

  return (
    <header className="text-center m-5">
      <h2>Welcome to the wallet that <strong>helps you understand</strong>!</h2>
      <h3>This wallet interacts <em>directly</em> with a Bitcoin Node in <span
          className="learn-keyword"
          onClick={() => dispatch(changeLearnModal({ modalShow: true, topic: "regtest" }))}>
           regtest
        </span> mode</h3>
      <h4><Link to={'/login'}>Login or Create an account</Link> to get started <Link onClick={handleContinueAsGuest}>or continue as guest</Link></h4>
    </header>
  )
}

export default Banner;
