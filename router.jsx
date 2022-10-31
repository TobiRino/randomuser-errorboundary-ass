import {useState} from 'react'
import useFetch from './useFetch'
import {
  NavLink,
  Routes,
  Route,
  Outlet,
  useNavigate
  
} from "react-router-dom";

function Navigation() {
  return (
    
    <section className="navigation">

      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/"
      >
        Home
      </NavLink>
      
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/Users"
      >
        User
      </NavLink>
      
      
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/About"
      >
        About
      </NavLink>
    </section>
  );
}

export function Home() {
  return (
    <div>
      <h1 className="home">Welcome to my Home Page </h1>

      <Navigation />
    </div>
  );
}

function About() {
  
  return <>
    <p>This is About Page</p>
 <NavLink
        className="Navigated"
        to="nested1"
      >
       My nested Route For Page One
      </NavLink>
    <NavLink
        
        className="Navigated"
        to="nested2"
      >
        My nested Route For Page Two
      </NavLink>

  <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/"
      >
        Home
      </NavLink>
  </>
}

export function Users() {
 const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  );
  // const { loading, error, data } = useFetch(
  //   `https://randomuser.me/api/?results=1000&seed=abc`
  // );

  console.log({ loading, error, data });

  // step1
  const PER_PAGE = 5;
  // step2
  const total = data?.results?.length;
  // step3
  const pages = 40;
  // let page = 1
  // Magic of pagination
  // 1 * 10 - 10 = 0
  // 2 * 10 - 10 = 10
  // 3 * 10 - 10 = 20
  // 1 * 5 - 5 = 0
  // 2 * 5 - 5 = 5
  // 3 * 5 - 5 = 10
  const skip = page * PER_PAGE - PER_PAGE;
  // console.log(skip, total);

  // use the useEffect to make api call based on the page.

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div className="App">
      <h1 className="title">List of Users</h1>
      {/* TODO: another magic with Array.slice() */}
      {/* slice(0, 10) */}
      {/* slice(10, 20) */}
      {/* slice(20, 30) */}

      {/* 0, 0 + 5 slice(0, 5)*/}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {/* 0, 1*10 */}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {data?.results
        // .slice(skip, skip + PER_PAGE)
        // .slice((page - 1) * PER_PAGE, page * PER_PAGE)
        .map((each, index) => {
          const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
          return (
            <li key={name.toLowerCase().replaceAll(' ', '')}>{`${name}`}</li>
          );
        })}
     
      <p className="pagination">
        Pages: {page} of {pages}
      </p>
       {
        <button
          
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
      }
      {
        <button className="next_btn"
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      }
      
      
      {/* another magic here */}
      {Array.from({ length: pages }, (value, index) => index + 1).map(
        (each) => (
          <button className="user_btn" onClick={() => setPage(each)}>{each}</button>
        )
      )}
      <div style={{margin:"15px"}}><Navigation /></div>
       
    </div>
  );
}

function FirstNestedRoute() {

  return (
    <div>
      <p className="nested_p">This is the first Nested Route</p>
    </div>
  );
}

function SecondNestedRoute() {
  return (
    <div>
      <p className="nested_p">This is the Second Nested Route</p>
    </div>
  );
}






const Notfound = () => {
  return (
    <div>
      <p style={{ color: "red", fontSize: "30px" }}>
        {" "}
        error 404 page Not found
      </p>

       <Navigation />
    </div>
  );
};
function AllRoute() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Users" element={<Users />}>

        </Route>
        <Route path="/About" element={<About />}>
          <Route path="nested1" element={<FirstNestedRoute />} />
          <Route path="nested2" element={<SecondNestedRoute />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default AllRoute;