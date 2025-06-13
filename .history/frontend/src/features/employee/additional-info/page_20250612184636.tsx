const Page = () => {
  const { setValue } = useFormContext<Schema>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue("portfolioLink", "https://example.com");
    }, 1500); // delay in ms

    return () => clearTimeout(timeout);
  }, [setValue]);

  return (
    <Grid size={{ xs: 6 }}>
      <TextField<Schema> name="portfolioLink" label={d.portfolioLink} />
    </Grid>
  );
}; // <-- This closing bracket was missing
