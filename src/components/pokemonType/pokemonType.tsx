import { useTranslation } from "react-i18next";

interface IProps {
  type: string;
}

export const PokemonType = (props: IProps) => {
  const { type } = props;

  const { t } = useTranslation();

  return <strong className={type + "__type"}>{t(`${type}`, { type })}</strong>;
};
