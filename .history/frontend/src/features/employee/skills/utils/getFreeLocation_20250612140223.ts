export async function getFreeLocation() {
  const res = await fetch("http://localhost:5000/api/free-locations");
  if (!res.ok) throw new Error("Failed to fetch slot");
  return res.json();
}
