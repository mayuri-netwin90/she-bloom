import { type ReactNode } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Menu,
  Pagination,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { StatePlaceholder } from '../StatePlaceholder'
import { AppIcon } from '../AppIcon'

export interface DataTableColumn<T> {
  key: string
  title: string
  render?: (row: T, index: number) => ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string | number
  sortable?: boolean
  hideOnTablet?: boolean
}

export interface DataTableSortStatus {
  columnAccessor: string
  direction: 'asc' | 'desc'
}

export interface DataTableRowAction<T> {
  icon?: ReactNode
  label: string
  onClick: (row: T) => void
  color?: string
}

export interface DataTablePagination {
  total: number
  page: number
  onChange: (page: number) => void
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  isLoading?: boolean
  searchQuery?: string
  onSearch?: (value: string) => void
  searchPlaceholder?: string
  emptyMessage?: string
  rowKey?: (row: T, index: number) => string | number

  // Server-driven Pagination
  pagination?: DataTablePagination
  totalRecords?: number
  recordsPerPage?: number

  // Server-driven Sorting
  sortStatus?: DataTableSortStatus
  onSortStatusChange?: (status: DataTableSortStatus) => void

  // Row Selection
  selectedRecords?: Array<string | number>
  onSelectedRecordsChange?: (selected: Array<string | number>) => void

  // Row Actions
  rowActions?: DataTableRowAction<T>[]

  // CSV Export
  onExportCSV?: () => void
}

/**
 * Standardized responsive, server-driven DataTable Component.
 * Supports desktop striped/hover table, mobile list card fallback,
 * sorting, row selection, actions menu, and pagination stats.
 */
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  searchQuery,
  onSearch,
  searchPlaceholder = 'Search records...',
  emptyMessage = 'No records found.',
  rowKey,

  pagination,
  totalRecords,
  recordsPerPage,

  sortStatus,
  onSortStatusChange,

  selectedRecords,
  onSelectedRecordsChange,

  rowActions,
  onExportCSV,
}: DataTableProps<T>) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const getRowId = (row: T, index: number): string | number => {
    return rowKey ? rowKey(row, index) : row.id ?? index
  }

  // Row selection helpers
  const allCurrentIds = data.map((row, idx) => getRowId(row, idx))
  const isAllSelected =
    selectedRecords &&
    data.length > 0 &&
    allCurrentIds.every((id) => selectedRecords.includes(id))
  const isIndeterminate =
    selectedRecords &&
    !isAllSelected &&
    allCurrentIds.some((id) => selectedRecords.includes(id))

  const handleToggleSelectAll = () => {
    if (!onSelectedRecordsChange || !selectedRecords) return
    if (isAllSelected) {
      onSelectedRecordsChange(selectedRecords.filter((id) => !allCurrentIds.includes(id)))
    } else {
      const combined = Array.from(new Set([...selectedRecords, ...allCurrentIds]))
      onSelectedRecordsChange(combined)
    }
  }

  const handleToggleRowSelect = (id: string | number) => {
    if (!onSelectedRecordsChange || !selectedRecords) return
    if (selectedRecords.includes(id)) {
      onSelectedRecordsChange(selectedRecords.filter((item) => item !== id))
    } else {
      onSelectedRecordsChange([...selectedRecords, id])
    }
  }

  // Sorting helper
  const handleSortClick = (col: DataTableColumn<T>) => {
    if (!col.sortable || !onSortStatusChange) return
    const isCurrent = sortStatus?.columnAccessor === col.key
    const nextDirection: 'asc' | 'desc' =
      isCurrent && sortStatus?.direction === 'asc' ? 'desc' : 'asc'
    onSortStatusChange({
      columnAccessor: col.key,
      direction: nextDirection,
    })
  }

  // Pagination calculation
  const currentPage = pagination?.page ?? 1
  const pageSize = recordsPerPage ?? (data.length > 0 ? data.length : 10)
  const effectiveTotalRecords = totalRecords ?? (pagination ? pagination.total * pageSize : data.length)
  const startRecord = data.length > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const endRecord = data.length > 0 ? Math.min(startRecord + data.length - 1, effectiveTotalRecords) : 0
  const totalPages = pagination?.total ?? (totalRecords && recordsPerPage ? Math.ceil(totalRecords / recordsPerPage) : 1)

  return (
    <Paper withBorder p="md" radius="md">
      <Stack gap="md">
        {/* Top Header: Search and Export CSV */}
        {(onSearch || onExportCSV) && (
          <Group justify="space-between" align="center" wrap="wrap" gap="sm">
            {onSearch ? (
              <TextInput
                placeholder={searchPlaceholder}
                leftSection={<AppIcon name="search" size={16} stroke={1.5} />}
                value={searchQuery}
                onChange={(e) => onSearch(e.currentTarget.value)}
                w={{ base: '100%', sm: 300 }}
              />
            ) : <Box />}

            {onExportCSV && (
              <Button
                variant="light"
                color="brand-pink"
                leftSection={<AppIcon name="download" size={16} stroke={1.5} />}
                onClick={onExportCSV}
                size="sm"
              >
                Export CSV
              </Button>
            )}
          </Group>
        )}

        {/* Content Section: Mobile Card Mode vs Desktop Table Mode */}
        <Box style={{ position: 'relative', minHeight: isLoading ? 140 : undefined }}>
          <LoadingOverlay
            visible={isLoading}
            overlayProps={{ radius: 'sm', blur: 1 }}
            loaderProps={{ color: 'brand-pink', size: 'md' }}
          />

          {isMobile ? (
            /* Mobile ListCard Mode */
            data.length > 0 ? (
              <Stack gap="sm">
                {data.map((row, index) => {
                  const id = getRowId(row, index)
                  const isChecked = selectedRecords?.includes(id)
                  const primaryCol = columns[0]
                  const secondaryCols = columns.slice(1)

                  return (
                    <Card key={id} withBorder p="sm" radius="md">
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Group align="flex-start" gap="xs">
                          {selectedRecords && (
                            <Checkbox
                              checked={isChecked}
                              onChange={() => handleToggleRowSelect(id)}
                              aria-label={`Select row ${id}`}
                              color="brand-pink"
                              mt={4}
                            />
                          )}
                          <div>
                            <Text size="sm" fw={600}>
                              {primaryCol?.render
                                ? primaryCol.render(row, index)
                                : row[primaryCol?.key]}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {primaryCol?.title}
                            </Text>
                          </div>
                        </Group>

                        {rowActions && rowActions.length > 0 && (
                          <Menu shadow="md" width={180} position="bottom-end">
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray" size="sm">
                                <AppIcon name="dotsVertical" size={16} stroke={1.5} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              {rowActions.map((action, aIdx) => (
                                <Menu.Item
                                  key={aIdx}
                                  leftSection={action.icon}
                                  color={action.color}
                                  onClick={() => action.onClick(row)}
                                >
                                  {action.label}
                                </Menu.Item>
                              ))}
                            </Menu.Dropdown>
                          </Menu>
                        )}
                      </Group>

                      {secondaryCols.length > 0 && (
                        <>
                          <Divider my="xs" />
                          <Stack gap={6}>
                            {secondaryCols.map((col) => (
                              <Group key={col.key} justify="space-between" gap="xs">
                                <Text size="xs" c="dimmed" fw={500}>
                                  {col.title}:
                                </Text>
                                <Text size="xs" fw={500} ta="right">
                                  {col.render ? col.render(row, index) : row[col.key]}
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                        </>
                      )}
                    </Card>
                  )
                })}
              </Stack>
            ) : (
              <Center py="xl">
                <StatePlaceholder type="empty" message={emptyMessage} />
              </Center>
            )
          ) : (
            /* Desktop / Tablet Table Mode */
            <Box style={{ overflowX: 'auto' }}>
              <Table striped highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
                <Table.Thead>
                  <Table.Tr>
                    {selectedRecords && (
                      <Table.Th style={{ width: 44 }}>
                        <Checkbox
                          checked={isAllSelected}
                          indeterminate={isIndeterminate}
                          onChange={handleToggleSelectAll}
                          aria-label="Select all rows"
                          color="brand-pink"
                        />
                      </Table.Th>
                    )}

                    {columns.map((col) => (
                      <Table.Th
                        key={col.key}
                        visibleFrom={col.hideOnTablet ? 'md' : undefined}
                        style={{
                          textAlign: col.align ?? 'left',
                          width: col.width,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col.sortable ? (
                          <UnstyledButton
                            onClick={() => handleSortClick(col)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <Text size="sm" fw={600}>
                              {col.title}
                            </Text>
                            {sortStatus?.columnAccessor === col.key ? (
                              sortStatus.direction === 'asc' ? (
                                <AppIcon name="chevronUp" size={14} stroke={2} />
                              ) : (
                                <AppIcon name="chevronDown" size={14} stroke={2} />
                              )
                            ) : (
                              <AppIcon name="selector" size={14} stroke={1.5} color="var(--mantine-color-gray-5)" />
                            )}
                          </UnstyledButton>
                        ) : (
                          col.title
                        )}
                      </Table.Th>
                    ))}

                    {rowActions && rowActions.length > 0 && (
                      <Table.Th style={{ width: 50, textAlign: 'right' }}>
                        Actions
                      </Table.Th>
                    )}
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {data.length > 0 ? (
                    data.map((row, index) => {
                      const id = getRowId(row, index)
                      const isChecked = selectedRecords?.includes(id)

                      return (
                        <Table.Tr key={id}>
                          {selectedRecords && (
                            <Table.Td style={{ width: 44 }}>
                              <Checkbox
                                checked={isChecked}
                                onChange={() => handleToggleRowSelect(id)}
                                aria-label={`Select row ${id}`}
                                color="brand-pink"
                              />
                            </Table.Td>
                          )}

                          {columns.map((col) => (
                            <Table.Td
                              key={col.key}
                              visibleFrom={col.hideOnTablet ? 'md' : undefined}
                              style={{
                                textAlign: col.align ?? 'left',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {col.render ? col.render(row, index) : row[col.key]}
                            </Table.Td>
                          ))}

                          {rowActions && rowActions.length > 0 && (
                            <Table.Td style={{ textAlign: 'right' }}>
                              <Menu shadow="md" width={180} position="bottom-end">
                                <Menu.Target>
                                  <ActionIcon variant="subtle" color="gray" size="sm">
                                    <AppIcon name="dotsVertical" size={16} stroke={1.5} />
                                  </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                  {rowActions.map((action, aIdx) => (
                                    <Menu.Item
                                      key={aIdx}
                                      leftSection={action.icon}
                                      color={action.color}
                                      onClick={() => action.onClick(row)}
                                    >
                                      {action.label}
                                    </Menu.Item>
                                  ))}
                                </Menu.Dropdown>
                              </Menu>
                            </Table.Td>
                          )}
                        </Table.Tr>
                      )
                    })
                  ) : (
                    <Table.Tr>
                      <Table.Td
                        colSpan={
                          columns.length +
                          (selectedRecords ? 1 : 0) +
                          (rowActions && rowActions.length > 0 ? 1 : 0)
                        }
                      >
                        <Center py="xl">
                          <StatePlaceholder type="empty" message={emptyMessage} />
                        </Center>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Box>
          )}
        </Box>

        {/* Bottom Pagination & Records Summary */}
        {(pagination || totalRecords !== undefined) && (
          <Group justify="space-between" align="center" pt="xs" wrap="wrap" gap="sm">
            <Text c="dimmed" size="sm">
              Showing {startRecord} to {endRecord} of {effectiveTotalRecords} entries
            </Text>

            {totalPages > 1 && pagination && (
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={pagination.onChange}
                color="brand-pink"
                size="sm"
              />
            )}
          </Group>
        )}
      </Stack>
    </Paper>
  )
}
