import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./status-badge";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "./ui/table";


function AccountCard() {
  return (
    <Card className="max-w-[600px] shadow-none rounded-md">
      <CardContent className="flex flex-col gap-3 py-4 px-6">
        {/* Account Name, Broker and Status */}
        <div className="flex items-center">
          <div className="flex-grow">
            <h1 className="text-xl font-bold">Demo Account</h1>
            <h3 className="text-muted-foreground">Exness</h3>
          </div>
          <StatusBadge status="Connected" />
        </div>

        <Separator />

        {/* Account Balance, Margin and others */}

        <Table>
          <TableCaption>Updated just now</TableCaption>
          <TableBody className="font-semibold text-[15px]">
            <TableRow>
              <TableCell>Balance</TableCell>
              <TableCell className="text-right">10000 USD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Margin</TableCell>
              <TableCell className="text-right">10000 USD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Equity</TableCell>
              <TableCell className="text-right">10000 USD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profit</TableCell>
              <TableCell className="text-right">10000 USD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Free Margin</TableCell>
              <TableCell className="text-right">10000 USD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Margin Level</TableCell>
              <TableCell className="text-right">10000 USD</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AccountCard;
