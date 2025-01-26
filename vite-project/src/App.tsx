import { useState, useEffect } from "react";
import "./App.css";
import { Table, Button } from "react-bootstrap";

function App() {
  const [subdomains, setSubdomains] = useState([]);
  useEffect(() => {
    const fetchSubdomains = async () => {
      try {
        const response = await fetch("/subdomains.json"); // Replace with your endpoint if needed
        if (!response.ok) throw new Error("Failed to fetch subdomains.");

        const data = await response.json();
        setSubdomains(data);
      } catch (error) {
        console.error("Error fetching subdomains:", error);
      }
    };

    fetchSubdomains();
  }, []);

  return (
    <div className="p-6" style={{ height: "100vh" }}>
      <h1 className="text-2xl font-bold mb-4">Subdomain Directory</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {subdomains.map((subdomain) => (
            <tr key={subdomain.url}>
              <td>{subdomain.title}</td>
              <td>
                <Button
                  as="a"
                  href={`https://${subdomain.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {subdomain.title}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
