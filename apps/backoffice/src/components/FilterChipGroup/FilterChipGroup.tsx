import { Chip, Group } from '@mantine/core'

export interface FilterChipOption {
  label: string
  value: string
}

export interface FilterChipGroupProps {
  options: FilterChipOption[]
  value: string | string[]
  onChange: (value: any) => void
  multiple?: boolean
}

/**
 * FilterChipGroup Component
 * Wraps Mantine Chip.Group and Chip components with brand-pink and light variant.
 */
export function FilterChipGroup({
  options,
  value,
  onChange,
  multiple = false,
}: FilterChipGroupProps) {
  return (
    <Chip.Group multiple={multiple} value={value} onChange={onChange}>
      <Group gap="xs" wrap="wrap">
        {options.map((option) => (
          <Chip
            key={option.value}
            value={option.value}
            color="brand-pink"
            variant="light"
            size="sm"
          >
            {option.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  )
}
