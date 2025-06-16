import { ErrorMessage } from "@/features/form/components/error-message";
import { TextField } from "@/features/form/components/controllers/text-field";
import { Schema } from "@/features/newPlant/trayContents/types/schema";
import { d } from "@/utils/dictionary";
import { useOnDemandScan } from "@/features/newPlant/trayContents/utils/useOnDemandScan";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Chip, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFieldArray, useWatch } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { useFormContext } from "@/features/form/hooks/useFormContext";

const EmployeeHistory = () => {
  const { control, readOnly } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trayRegistry",
  });

  const trayRegistry = useWatch<Schema, "trayRegistry">({
    control,
    name: "trayRegistry",
  }) ?? [];

  const lastQr = trayRegistry[trayRegistry.length - 1]?.qrCode;
  const canAdd = fields.length === 0 || Boolean(lastQr);

  const startScan = useOnDemandScan();

  const handleAddClick = () => {
    if (!canAdd) return;

    const newIndex = fields.length;
    append({ qrCode: "" });

    setTimeout(() => startScan(newIndex), 50);

    setTimeout(() => {
      const active = document.activeElement as HTMLElement | null;
      active?.blur();
    }, 0);
  };

  const handleRemoveClick = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Grid sx={{ display: "flex", alignItems: "center" }} size={12}>
        <Typography variant="subtitle2">{d.trayRegistry}:</Typography>
        {!readOnly && (
          <IconButton onClick={handleAddClick} color="success" disabled={!canAdd}>
            <AddCircleRoundedIcon />
          </IconButton>
        )}
      </Grid>

      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Grid sx={{ display: "flex", alignItems: "center" }} size={12}>
            <Chip label={`Tray #${index + 1}`} size="small" color="secondary" />
            {!readOnly && (
              <IconButton color="error" onClick={() => handleRemoveClick(index)}>
                <RemoveCircleOutlineRoundedIcon />
              </IconButton>
            )}
          </Grid>

          <Grid size={12}>
            <TextField<Schema>
              name={`trayRegistry.${index}.qrCode`}
              label={d.qrCode}
              inputProps={{ readOnly: true }} 
              helperText="Auto-filled by QR scan"
            />
          </Grid>
        </Fragment>
      ))}

      <Grid size={12}>
        <ErrorMessage<Schema> name="trayRegistry" />
      </Grid>
    </>
  );
};

export { EmployeeHistory };
