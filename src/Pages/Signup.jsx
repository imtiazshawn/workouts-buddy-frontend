import React, { useState } from 'react';
import { useSignup} from '../Hooks/useSignup';

const Signup = () => {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        {/* Email */}
        <label>Email Adress:</label>
        <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
        />

        {/* Password */}
        <label>Password:</label>
        <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
        />

        <button disabled={isLoading}>Sign Up</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup;