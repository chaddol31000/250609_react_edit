import logo from './logo.svg';
import './App.css';
import PostList from './pages/posts/PostList';
import { Route, Routes } from 'react-router-dom';
import Header from './fragments/Header';
import Nav from './fragments/Nav';
import Aside from './fragments/Aside';
import Footer from './fragments/Footer';
import MemberSignup from './pages/members/MemberSignup';
import NotFound from './pages/NotFound';
import MemberLogin from './pages/members/MemberLogin';
import useAuthStore from './stores/useAuthStore';
import { useEffect } from 'react';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import MemberFindUsername from './components/members/MemberFindUsername';
import MemberVerified from './pages/members/MemberVerified';
import MemberFindPassword from './pages/members/MemberFindPassword';
import MemberRead from './pages/members/MemberRead';
import MemberCheckPassword from './pages/members/MemberCheckPassword';
import MemberChangePassword from './pages/members/MemberChangePassword';

function App() {
  const checkAuth = useAuthStore(state=>state.checkAuth);

  // 앱이 실행될 때 아이디를 확인해라
  useEffect(()=> {
    checkAuth();
  },[]);
  return (
    <div className="App">
      <Header />
        <Nav />
        <main>
          <Aside />
          <section>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/member/signup" element ={<PublicRoute element={<MemberSignup />} />} />
              <Route path="/member/verified" element ={<PublicRoute element={<MemberVerified />} />} />
              <Route path="/member/login" element ={<PublicRoute element={<MemberLogin />}/>} />
              <Route path="/member/find-username" element={<PublicRoute element={<MemberFindUsername />}/>}/>
              <Route path="/member/find-password" element={<PublicRoute element={<MemberFindPassword />}/>}/>
              <Route path="/member/check-password" element={<PrivateRoute element={<MemberCheckPassword />}/>}/>
              <Route path="/member/read" element={<PrivateRoute element={<MemberRead />}/>}/>
              <Route path="/member/change-password" element={<PrivateRoute element={<MemberChangePassword />}/>}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </section>
          <Aside />
        </main>
        <Footer />
    </div>
  );
}

export default App;
