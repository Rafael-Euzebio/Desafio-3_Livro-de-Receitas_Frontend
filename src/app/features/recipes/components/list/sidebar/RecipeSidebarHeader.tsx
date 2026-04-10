import { Button } from "../../../../../components/Header/ActionButton";

interface RecipeSidebarHeaderProps {
  onClose: () => void;
}

export function RecipeSidebarHeader({ onClose }: RecipeSidebarHeaderProps) {

  return (
    <Button
      children="Fechar"
      onFunction={onClose}
      color="error"
      variant="contained"
    />


  );
}