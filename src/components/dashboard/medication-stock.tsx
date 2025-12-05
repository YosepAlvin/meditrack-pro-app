import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { medications } from "@/lib/data"
import { PlusCircle, MinusCircle } from "lucide-react"

export default function MedicationStock() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Medication Stock</CardTitle>
        <CardDescription>Manage and monitor medication inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medication</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med) => (
              <TableRow key={med.id}>
                <TableCell className="font-medium">
                  <div>{med.name}</div>
                  <div className="text-xs text-muted-foreground">{med.strength}</div>
                </TableCell>
                <TableCell>
                  {med.stock <= med.lowStockThreshold ? (
                    <Badge variant="destructive">Low Stock</Badge>
                  ) : null}
                  <span className="ml-2">{med.stock}</span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MinusCircle className="h-4 w-4" />
                    <span className="sr-only">Decrease stock</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Increase stock</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
