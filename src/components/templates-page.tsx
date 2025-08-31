"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Edit, Trash2, Play } from "lucide-react";
import { Template } from "@/types/template";
import { templateStore } from "@/lib/data/templates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TemplateFormDialog from "./template-form-dialog";

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "global" | "user">("all");
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTemplates = () => {
    setRefreshKey(prev => prev + 1);
  };

  const filteredTemplates = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    refreshKey; // Used to trigger re-computation when templates change
    return templateStore.getTemplatesByScope(activeTab);
  }, [activeTab, refreshKey]);

  const handleDelete = (template: Template) => {
    if (template.scope === "user") {
      templateStore.deleteTemplate(template.id);
      refreshTemplates();
    }
  };

  const handleUseTemplate = (template: Template) => {
    // Navigate to editor with template ID
    window.location.href = `/editor?templateId=${template.id}`;
  };

  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "scope",
      header: "Scope",
      cell: ({ row }) => {
        const scope = row.getValue("scope") as string;
        return (
          <Badge variant={scope === "global" ? "secondary" : "default"}>
            {scope === "global" ? "Global" : "User"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt") as string);
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const template = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUseTemplate(template)}
            >
              <Play className="h-4 w-4 mr-1" />
              Use
            </Button>
            {template.scope === "user" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingTemplate(template)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(template)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredTemplates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Templates</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Template</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new template for your quote designs.
              </DialogDescription>
            </DialogHeader>
            <TemplateFormDialog
              onSuccess={() => {
                setIsCreateDialogOpen(false);
                refreshTemplates();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "global" | "user")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="user">My Templates</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} total templates
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Page</p>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Template Dialog */}
      <Dialog
        open={!!editingTemplate}
        onOpenChange={(open) => !open && setEditingTemplate(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Update your template configuration.
            </DialogDescription>
          </DialogHeader>
          {editingTemplate && (
            <TemplateFormDialog
              template={editingTemplate}
              onSuccess={() => {
                setEditingTemplate(null);
                refreshTemplates();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}