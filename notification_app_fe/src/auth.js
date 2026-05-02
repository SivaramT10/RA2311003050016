export async function getToken() {
  const res = await fetch("http://20.207.122.201/evaluation-service/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "ts5420@srmist.edu.in",
      name: "Sivaram T",
      rollNo: "RA2311003050016",
      accessCode: "QkbpxH",
      clientID: "13fd936d-285a-4d37-a0f7-1c7c1c2bf5a5",
      clientSecret: "dWVUNHTVGAFaNwJA",
      
    }),
  });

  const data = await res.json();
  return data.access_token;
}