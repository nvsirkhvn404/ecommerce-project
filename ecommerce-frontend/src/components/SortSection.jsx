import React from 'react'
import { Button } from './ui/button'
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

export default function SortSection({ setSortField, setSortOrder, sortOrder }) {
  return (
    <div className="flex gap-4">
				<Button
					className="self-start"
					variant="outline"
					onClick={() =>
						setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
					}
				>
					{sortOrder === "asc" ? (
						<>
							Ascending <ArrowUpNarrowWideIcon />
						</>
					) : (
						<>
							Descending <ArrowDownNarrowWideIcon />
						</>
					)}
				</Button>

				<Select onValueChange={(value) => setSortField(value)}>
					<SelectTrigger className="w-full max-w-48">
						<SelectValue placeholder="Sort By" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sort By</SelectLabel>
							<SelectItem value="title">Title</SelectItem>
							<SelectItem value="price">Price</SelectItem>
							<SelectItem value="rating">Rating</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
  )
}
