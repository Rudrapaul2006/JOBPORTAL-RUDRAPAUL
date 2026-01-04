import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { companies_end_point } from "../utils/Constant";
import { setCompanies } from "../Redux/companySlice";
import { toast } from "sonner";
import useGetAllCompanies from "../Hooks/useGetAllCompanies";

let CompaniesTable = () => {
  let { companies, searchCompanyByText } = useSelector((state) => state.company);
  let [filteredCompanies, setFilteredCompanies] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useGetAllCompanies();

  //  FILTER LOGIC (SAFE)
  useEffect(() => {
    let searchText = searchCompanyByText?.toLowerCase() || "";

    let filtered = companies.filter((comp) =>
      comp.companyName.toLowerCase().includes(searchText)
    );

    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  // DELETE
  let handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      let res = await axios.delete(
        `${companies_end_point}/delete/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Company deleted");
        dispatch(setCompanies(companies.filter((c) => c._id !== id)));
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="lg:mx-25 mt-9">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Company Details</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No companies registered yet ..
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((comp) => (
              <TableRow key={comp._id}>
                <TableCell >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={comp.logo}  className="object-contain" />
                  </Avatar>
                </TableCell>

                <TableCell>{comp.companyName}</TableCell>

                <TableCell>
                  {comp.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="hover:text-[red] hover:underline cursor-pointer"><button className="ml-10 lg:ml-2 cursor-pointer hover:text-[red] hover:underline" onClick={() => navigate(`/admin/companies/details/${comp._id}`)} >View</button></TableCell>

                <TableCell className="">
                  <Button
                    onClick={() => handleDelete(comp._id)}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
