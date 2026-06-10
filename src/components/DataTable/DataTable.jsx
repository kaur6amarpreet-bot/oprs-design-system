import React, { useState } from 'react';
import './DataTable.css';

/**
 * KSRTC DataTable
 *
 * columns: [{ key, label, width?, align?, sortable?, render? }]
 * rows:    array of data objects
 * density: 'comfortable' | 'compact'
 * selectable: boolean — show checkbox column
 * loading: boolean — show skeleton rows
 * stickyHeader: boolean
 * groupKey: string — group rows by this column (shows group header row)
 */
export function DataTable({
  columns = [],
  rows = [],
  density = 'comfortable',
  selectable = false,
  loading = false,
  stickyHeader = false,
  groupKey,
  emptyMessage = 'No data available',
  onSort,
  defaultSortKey,
  defaultSortDir = 'asc',
  onRowClick,
  selectedRows = [],
  onSelectionChange,
}) {
  const [sortKey, setSortKey]   = useState(defaultSortKey || null);
  const [sortDir, setSortDir]   = useState(defaultSortDir);
  const [selected, setSelected] = useState(new Set(selectedRows));

  const handleSort = (key) => {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(newDir);
    onSort?.(key, newDir);
  };

  const handleSelectAll = (e) => {
    const next = e.target.checked ? new Set(rows.map((_, i) => i)) : new Set();
    setSelected(next);
    onSelectionChange?.(Array.from(next));
  };

  const handleSelectRow = (idx) => {
    const next = new Set(selected);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setSelected(next);
    onSelectionChange?.(Array.from(next));
  };

  // Sort rows
  let displayRows = [...rows];
  if (sortKey) {
    displayRows.sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (av == null) return 1; if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  // Group rows
  const renderRows = () => {
    if (!groupKey) {
      return displayRows.map((row, idx) => renderRow(row, idx));
    }
    const groups = {};
    displayRows.forEach((row, idx) => {
      const g = row[groupKey] || 'Other';
      if (!groups[g]) groups[g] = [];
      groups[g].push({ row, idx });
    });
    return Object.entries(groups).flatMap(([group, items]) => [
      <tr key={`group-${group}`} className="ksrtc-tbl__group-row">
        <td colSpan={columns.length + (selectable ? 1 : 0)}>{group}</td>
      </tr>,
      ...items.map(({ row, idx }) => renderRow(row, idx)),
    ]);
  };

  const renderRow = (row, idx) => (
    <tr
      key={idx}
      className={`ksrtc-tbl__row${selected.has(idx) ? ' ksrtc-tbl__row--selected' : ''}${onRowClick ? ' ksrtc-tbl__row--clickable' : ''}`}
      onClick={() => onRowClick?.(row, idx)}
    >
      {selectable && (
        <td className="ksrtc-tbl__td ksrtc-tbl__td--check" onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={selected.has(idx)}
            onChange={() => handleSelectRow(idx)}
            aria-label={`Select row ${idx + 1}`}
          />
        </td>
      )}
      {columns.map(col => (
        <td
          key={col.key}
          className={`ksrtc-tbl__td${col.align ? ` ksrtc-tbl__td--${col.align}` : ''}`}
          style={col.width ? { width: col.width } : {}}
        >
          {col.render ? col.render(row[col.key], row, idx) : (row[col.key] ?? '—')}
        </td>
      ))}
    </tr>
  );

  const skeletonRow = (i) => (
    <tr key={`sk-${i}`} className="ksrtc-tbl__row">
      {selectable && <td className="ksrtc-tbl__td ksrtc-tbl__td--check"><div className="ksrtc-tbl__skeleton" style={{ width: 16, height: 16 }} /></td>}
      {columns.map(col => (
        <td key={col.key} className="ksrtc-tbl__td">
          <div className="ksrtc-tbl__skeleton" style={{ width: `${40 + Math.random() * 40}%`, height: 12 }} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className={`ksrtc-tbl-wrap ksrtc-tbl-wrap--${density}`}>
      <table className="ksrtc-tbl" aria-busy={loading}>
        <thead className={stickyHeader ? 'ksrtc-tbl__head--sticky' : ''}>
          <tr>
            {selectable && (
              <th className="ksrtc-tbl__th ksrtc-tbl__th--check">
                <input
                  type="checkbox"
                  checked={selected.size === rows.length && rows.length > 0}
                  ref={el => { if (el) el.indeterminate = selected.size > 0 && selected.size < rows.length; }}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                className={`ksrtc-tbl__th${col.sortable ? ' ksrtc-tbl__th--sortable' : ''}${col.align ? ` ksrtc-tbl__th--${col.align}` : ''}`}
                style={col.width ? { width: col.width } : {}}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={col.sortable && sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <span className="ksrtc-tbl__th-inner">
                  {col.label}
                  {col.sortable && (
                    <span className="ksrtc-tbl__sort-icon material-symbols-outlined">
                      {sortKey === col.key ? (sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }, (_, i) => skeletonRow(i))
            : displayRows.length === 0
              ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="ksrtc-tbl__empty">
                    <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--color-outline-variant)', display: 'block', marginBottom: 8 }}>table_rows</span>
                    {emptyMessage}
                  </td>
                </tr>
              )
              : renderRows()
          }
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
