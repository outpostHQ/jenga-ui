import { JengaTextProps, Text } from './components/content/Text';
import { JengaTitleProps, Title } from './components/content/Title';
import { JengaParagraphProps, Paragraph } from './components/content/Paragraph';

export { Item, Section } from '@react-stately/collections';

// generic components
export { Base } from './components/Base';
export { Block } from './components/Block';
export type { JengaBlockProps } from './components/Block';
export { ActiveZone } from './components/content/ActiveZone/ActiveZone';
export type { JengaActiveZoneProps } from './components/content/ActiveZone/ActiveZone';
export * from './components/content/CopySnippet';
export { Grid } from './components/layout/Grid';
export type { JengaGridProps } from './components/layout/Grid';
export { Flex } from './components/layout/Flex';
export type { JengaFlexProps } from './components/layout/Flex';
export { Link } from './components/navigation/Link/Link';
export { Space } from './components/layout/Space';
export type { JengaSpaceProps } from './components/layout/Space';
export { Flow } from './components/layout/Flow';
export type { JengaFlowProps } from './components/layout/Flow';
export { Root } from './components/Root';
export type { JengaRootProps } from './components/Root';
export { PrismCode } from './components/content/PrismCode/PrismCode';
export type { JengaPrismCodeProps } from './components/content/PrismCode/PrismCode';
export { Prefix } from './components/layout/Prefix';
export type { JengaPrefixProps } from './components/layout/Prefix';
export { Suffix } from './components/layout/Suffix';
export type { JengaSuffixProps } from './components/layout/Suffix';
export { Divider } from './components/content/Divider';
export type { JengaDividerProps } from './components/content/Divider';
export { GridProvider } from './components/GridProvider';
export type { JengaGridProviderProps } from './components/GridProvider';
export { Content } from './components/content/Content';
export type { JengaContentProps } from './components/content/Content';
export { Header } from './components/content/Header';
export type { JengaHeaderProps } from './components/content/Header';
export { Footer } from './components/content/Footer';
export type { JengaFooterProps } from './components/content/Footer';
export { Result } from './components/content/Result/Result';
export type {
  JengaResultProps,
  JengaResultStatus,
} from './components/content/Result/Result';
export { FieldWrapper } from './components/forms/FieldWrapper';
export type { JengaFieldWrapperProps } from './components/forms/FieldWrapper';

// atoms
export { Base64Upload } from './components/other/Base64Upload/Base64Upload';
export type { JengaBase64UploadProps } from './components/other/Base64Upload/Base64Upload';
export { Card } from './components/content/Card/Card';
export type { JengaCardProps } from './components/content/Card/Card';
export * from './components/actions';
export { Placeholder } from './components/content/Placeholder/Placeholder';
export type { JengaPlaceholderProps } from './components/content/Placeholder/Placeholder';
export { Skeleton } from './components/content/Skeleton/Skeleton';
export type { JengaSkeletonProps } from './components/content/Skeleton/Skeleton';
export { Badge } from './components/content/Badge/Badge';
export type { JengaBadgeProps } from './components/content/Badge/Badge';
export { Tag } from './components/content/Tag/Tag';
export type { JengaTagProps } from './components/content/Tag/Tag';
export { SearchInput } from './components/forms/SearchInput/SearchInput';
export type { JengaSearchInputProps } from './components/forms/SearchInput/SearchInput';
export { Submit } from './components/actions/Button/Submit';
export type {
  JengaTextInputBaseProps,
  AriaTextFieldProps,
} from './components/forms/TextInput/TextInputBase';
export type { JengaTextInputBaseProps as JengaTextInputProps } from './components/forms/TextInput/TextInputBase';
export { TextInput } from './components/forms/TextInput/TextInput';
export { TextArea } from './components/forms/TextArea/TextArea';
export type { JengaTextAreaProps } from './components/forms/TextArea/TextArea';
export { FileInput } from './components/forms/FileInput/FileInput';
export type { JengaFileInputProps } from './components/forms/FileInput/FileInput';
export { PasswordInput } from './components/forms/PasswordInput/PasswordInput';
export { Checkbox } from './components/forms/Checkbox/Checkbox';
export type { JengaCheckboxProps } from './components/forms/Checkbox/Checkbox';
export { CheckboxGroup } from './components/forms/Checkbox/CheckboxGroup';
export type { JengaCheckboxGroupProps } from './components/forms/Checkbox/CheckboxGroup';
export { Switch } from './components/forms/Switch/Switch';
export type { JengaSwitchProps } from './components/forms/Switch/Switch';
export { Radio } from './components/forms/RadioGroup/Radio';
export type { JengaRadioProps } from './components/forms/RadioGroup/Radio';
export type { JengaRadioGroupProps } from './components/forms/RadioGroup/RadioGroup';
export { RangeSlider } from './components/forms/Slider/RangeSlider';
export type { JengaRangeSliderProps } from './components/forms/Slider/RangeSlider';
export { Slider } from './components/forms/Slider/Slider';
export type { JengaSliderProps } from './components/forms/Slider/Slider';
export { ComboBox } from './components/pickers/ComboBox/ComboBox';
export type { JengaComboBoxProps } from './components/pickers/ComboBox/ComboBox';
export { Menu } from './components/pickers/Menu/Menu';
export type { JengaMenuProps } from './components/pickers/Menu/Menu';
export { MenuTrigger } from './components/pickers/Menu/MenuTrigger';
export type { JengaMenuTriggerProps } from './components/pickers/Menu/MenuTrigger';
export { Select, ListBoxPopup } from './components/pickers/Select/Select';
export type {
  JengaSelectProps,
  JengaSelectBaseProps,
} from './components/pickers/Select/Select';
export { NumberInput } from './components/forms/NumberInput/NumberInput';
export type { JengaNumberInputProps } from './components/forms/NumberInput/NumberInput';
export { Avatar } from './components/content/Avatar/Avatar';
export type { JengaAvatarProps } from './components/content/Avatar/Avatar';
export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogForm,
} from './components/overlays/Dialog';
export type {
  JengaDialogTriggerProps,
  JengaDialogContainerProps,
  JengaDialogProps,
  JengaDialogFormRef,
  JengaDialogFormProps,
} from './components/overlays/Dialog';
export { Tooltip } from './components/overlays/Tooltip/Tooltip';
export type { JengaTooltipProps } from './components/overlays/Tooltip/Tooltip';
export { TooltipTrigger } from './components/overlays/Tooltip/TooltipTrigger';
export type { JengaTooltipTriggerProps } from './components/overlays/Tooltip/TooltipTrigger';
export { TooltipProvider } from './components/overlays/Tooltip/TooltipProvider';
export type { JengaTooltipProviderProps } from './components/overlays/Tooltip/TooltipProvider';

export * from './components/content/CopySnippet';
export * from './components/content/Alert';

// molecules
export { LegacyTabs } from './components/navigation/LegacyTabs/LegacyTabs';
export type { JengaTabsProps } from './components/navigation/LegacyTabs/LegacyTabs';
export { FileTabs } from './components/organisms/FileTabs/FileTabs';
export type { JengaFileTabProps } from './components/organisms/FileTabs/FileTabs';
export { Modal } from './components/organisms/Modal/Modal';
export type { JengaModalProps } from './components/organisms/Modal/Modal';
export { StatsCard } from './components/organisms/StatsCard/StatsCard';
export type { JengaStatsCard } from './components/organisms/StatsCard/StatsCard';
export {
  AlertDialog,
  useAlertDialogAPI,
} from './components/overlays/AlertDialog';
export type { JengaAlertDialogProps } from './components/overlays/AlertDialog';

// services
export { notification } from './services/notification';
export type { JengaNotificationOptions } from './services/notification';

export * from './tasty';

export const Typography = {
  Text,
  Title,
  Paragraph,
};

export { Text, Title, Paragraph };
export type { JengaTextProps, JengaTitleProps, JengaParagraphProps };

export { Provider } from './provider';
export type { useProviderProps } from './provider';
export { Portal } from './components/portal';
export type { PortalProps } from './components/portal';
export * from './components/forms';

export type {
  TagName,
  TagNameProps,
  AllBaseProps,
  BaseProps,
  BaseStyleProps,
  DimensionStyleProps,
  ColorStyleProps,
  OuterStyleProps,
  PositionStyleProps,
  TextStyleProps,
  BlockStyleProps,
  ContainerStyleProps,
  BasePropsWithoutChildren,
  Props,
  FlowStyleProps,
  ShortGridStyles,
} from './tasty';
export * from './tasty';

export { ModalProvider } from '@react-aria/overlays';
export * from './utils/react';
export * from './tasty';
export { default as copy } from 'clipboard-copy';
export * from '@react-aria/ssr';
export * from './components/forms/Form';
export * from './components/overlays/NewNotifications';
export * from './components/overlays/Toasts';
