import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { ChevronDown } from 'lucide-react'
import ViewReportDialog from './ViewReportDialog'

type Props = {
    historyList: SessionDetail[]
}

function HistoryTable({ historyList }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const firstThree = historyList.slice(0, 3);
  const rest = historyList.slice(3);

  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>AI Medical Specilist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {firstThree.map((record: SessionDetail, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{record.selectedDoctor?.specialist ?? "Unknown"}</TableCell>
              <TableCell>{record.notes}</TableCell>
              <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
              <TableCell className="text-right"><ViewReportDialog record={record} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rest.length > 0 && (
        <div className="w-full flex justify-center my-4">
          <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => setDrawerOpen(true)}>
                <ChevronDown />
                Show More
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle className="sr-only">All Consultation Reports</DialogTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>AI Medical Specilist</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rest.map((record: SessionDetail, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.selectedDoctor?.specialist ?? "Unknown"}</TableCell>
                      <TableCell>{record.notes}</TableCell>
                      <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
                      <TableCell className="text-right"><ViewReportDialog record={record} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default HistoryTable
