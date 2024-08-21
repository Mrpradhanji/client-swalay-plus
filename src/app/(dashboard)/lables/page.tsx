import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

import Style from "../../styles/Labels.module.css"

const invoices = [
  {
    invoice: "1",
    paymentStatus: "Lable Name",
    labelId: "1",
    status: 1,
    paymentMethod: "Mr. Abc",
  },
  {
    invoice: "2",
    paymentStatus: "Lable Name",
    labelId: "2",
    status: 2,
    paymentMethod: "Mr. xYZ",
  },
  {
    invoice: "3",
    paymentStatus: "Mango",
    labelId: "3",
    status: 3,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "4",
    paymentStatus: "Blue Rose",
    labelId: "4",
    status: 2,
    paymentMethod: "Mr. Abc",
  },
  {
    invoice: "5",
    paymentStatus: "Apple",
    labelId: "5",
    status: 3,
    paymentMethod: "Mr. xYZ",
  },
  {
    invoice: "6",
    paymentStatus: "Lable Name",
    labelId: "6",
    status: 1,
    paymentMethod: "DJ. Max",
  },
  {
    invoice: "7",
    paymentStatus: "Young Mountain",
    labelId: "7",
    status: 3,
    paymentMethod: "Mr. Abc",
  },
]

const lables = () => {
  return (
    <div>

      {/* <Link href="/">Home</Link> */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Labels</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mt-3">
        <h3 className={Style.heading}>All Labeles</h3>
        <Button>New Earn</Button>
      </div>

      <div className="mt-3 bg-white p-3">

        <Table>
          <TableCaption>A list of Labels</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr No</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>
                  {
                    invoice.status === 1 ? (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    ) : invoice.status === 2 ? (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Blocked                        
                      </span>
                    ) : invoice.status === 3 ? (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Processing
                      </span>
                    ) : null
                  }

                </TableCell>
                <TableCell className="text-right">
                  <Link className={Style.profileBtn} href={`/lables/${invoice.labelId}`}>View</Link>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell className="text-right">$2,500.00</TableCell>
  </TableRow>
</TableFooter> */}
        </Table>
      </div>

    </div>
  )
}

export default lables