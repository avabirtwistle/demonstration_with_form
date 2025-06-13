export async function postEmployeeSkills(data: any) {
  const response = await fetch("/api/employee-skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to save skills: ${response.statusText}`);
  }

  return response.json();
}
