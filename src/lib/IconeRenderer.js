import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as LucideIcons from "lucide-react";
import * as FiIcons from "react-icons/fi"
import * as BsIcons from "react-icons/bs"
import * as RiIcons from "react-icons/ri"
import * as IoIcons from "react-icons/io"
import * as Io5Icons from "react-icons/io5"

export function IconRenderer({ iconName, size = 24, className = "" }) {
  if (!iconName) return null;

  // Regroupe toutes les librairies d'icônes dans un seul objet
  const allIcons = {
    ...FaIcons,
    ...FiIcons,
    ...BsIcons,
    ...IoIcons,
    ...Io5Icons,
    ...MdIcons,
    ...AiIcons,
    ...RiIcons,
    ...BiIcons,
    ...LucideIcons,
  };

  // Trouve l'icône correspondante
  const IconComponent = allIcons[iconName];

  // Si non trouvée, affiche une icône par défaut
  if (!IconComponent) {
    const DefaultIcon = FaIcons.FaQuestionCircle;
    return <DefaultIcon size={size} className={`text-gray-400 ${className}`} />;
  }

  return <IconComponent size={size} className={className} />;
}
