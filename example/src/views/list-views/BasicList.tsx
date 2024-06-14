import { stampedBucket } from 'solid-new-bucket'
import { Filterbar, Filter, Table, TableActions, EditAction } from '../../../../src'
import FilterbarSettings from '../../../../src/components/FilterbarSettings'
import { AiFillCaretLeft, AiFillCaretRight } from 'solid-icons/ai'
import { model } from './BasicListModel'

export default function BasicList() {
  const filters = stampedBucket(model)

  return (
    <div class="flex flex-col w-full h-full">
      <Filterbar class='shrink-0 grid grid-cols-8' filters={filters} onSubmit={() => console.log(filters())}>
        <Filter name="id">
          <label class="input input-bordered input-sm flex items-center gap-2">
            ID
            <input type="text" class="grow" />
          </label>
        </Filter>
        <Filter name="job" class='col-span-2'>
          <select class="select select-bordered select-sm w-full">
            <option disabled selected>Who shot first?</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </Filter>
        <div>
          <button class="btn btn-sm btn-info">GO</button>
        </div>
        <FilterbarSettings class='col-start-8 flex justify-end' filters={filters} />
      </Filterbar>
      <Table filters={filters()} data={tableData} actions={
        <TableActions>
          <EditAction>
            <button class="btn btn-sm btn-ghost">EDIT</button>
          </EditAction>
          <button class="btn btn-sm btn-ghost">SELECT</button>
          <div class="join">
            <button class="join-item btn btn-sm"><AiFillCaretLeft /></button>
            <button class="join-item btn btn-sm">1</button>
            <button class="join-item btn btn-sm btn-active">2</button>
            <button class="join-item btn btn-sm btn-disabled">...</button>
            <button class="join-item btn btn-sm">3</button>
            <button class="join-item btn btn-sm">4</button>
            <button class="join-item btn btn-sm"><AiFillCaretRight /></button>
          </div>
        </TableActions>
      }>
      </Table>
    </div>
  )
}

const tableData = [
  {
    "id": "1",
    "name": "Cy Ganderton",
    "job": "Quality Control Specialist",
    "company": "Littel",
    "location": " Schaden and Vandervort",
    "lastLogin": "Canada",
    "favoriteColor": "12/16/2020",
    "FIELD8": "Blue"
  },
  {
    "id": "2",
    "name": "Hart Hagerty",
    "job": "Desktop Support Technician",
    "company": "Zemlak",
    "location": " Daniel and Leannon",
    "lastLogin": "United States",
    "favoriteColor": "12/5/2020",
    "FIELD8": "Purple"
  },
  {
    "id": "3",
    "name": "Brice Swyre",
    "job": "Tax Accountant",
    "company": "Carroll Group",
    "location": "China",
    "lastLogin": "8/15/2020",
    "favoriteColor": "Red",
    "FIELD8": ""
  },
  {
    "id": "4",
    "name": "Marjy Ferencz",
    "job": "Office Assistant I",
    "company": "Rowe-Schoen",
    "location": "Russia",
    "lastLogin": "3/25/2021",
    "favoriteColor": "Crimson",
    "FIELD8": ""
  },
  {
    "id": "5",
    "name": "Yancy Tear",
    "job": "Community Outreach Specialist",
    "company": "Wyman-Ledner",
    "location": "Brazil",
    "lastLogin": "5/22/2020",
    "favoriteColor": "Indigo",
    "FIELD8": ""
  },
  {
    "id": "6",
    "name": "Irma Vasilik",
    "job": "Editor",
    "company": "Wiza",
    "location": " Bins and Emard",
    "lastLogin": "Venezuela",
    "favoriteColor": "12/8/2020",
    "FIELD8": "Purple"
  },
  {
    "id": "7",
    "name": "Meghann Durtnal",
    "job": "Staff Accountant IV",
    "company": "Schuster-Schimmel",
    "location": "Philippines",
    "lastLogin": "2/17/2021",
    "favoriteColor": "Yellow",
    "FIELD8": ""
  },
  {
    "id": "8",
    "name": "Sammy Seston",
    "job": "Accountant I",
    "company": "O'Hara",
    "location": " Welch and Keebler",
    "lastLogin": "Indonesia",
    "favoriteColor": "5/23/2020",
    "FIELD8": "Crimson"
  },
  {
    "id": "9",
    "name": "Lesya Tinham",
    "job": "Safety Technician IV",
    "company": "Turner-Kuhlman",
    "location": "Philippines",
    "lastLogin": "2/21/2021",
    "favoriteColor": "Maroon",
    "FIELD8": ""
  },
  {
    "id": "10",
    "name": "Zaneta Tewkesbury",
    "job": "VP Marketing",
    "company": "Sauer LLC",
    "location": "Chad",
    "lastLogin": "6/23/2020",
    "favoriteColor": "Green",
    "FIELD8": ""
  },
  {
    "id": "11",
    "name": "Andy Tipple",
    "job": "Librarian",
    "company": "Hilpert Group",
    "location": "Poland",
    "lastLogin": "7/9/2020",
    "favoriteColor": "Indigo",
    "FIELD8": ""
  },
  {
    "id": "12",
    "name": "Sophi Biles",
    "job": "Recruiting Manager",
    "company": "Gutmann Inc",
    "location": "Indonesia",
    "lastLogin": "2/12/2021",
    "favoriteColor": "Maroon",
    "FIELD8": ""
  },
  {
    "id": "13",
    "name": "Florida Garces",
    "job": "Web Developer IV",
    "company": "Gaylord",
    "location": " Pacocha and Baumbach",
    "lastLogin": "Poland",
    "favoriteColor": "5/31/2020",
    "FIELD8": "Purple"
  },
  {
    "id": "14",
    "name": "Maribeth Popping",
    "job": "Analyst Programmer",
    "company": "Deckow-Pouros",
    "location": "Portugal",
    "lastLogin": "4/27/2021",
    "favoriteColor": "Aquamarine",
    "FIELD8": ""
  },
  {
    "id": "15",
    "name": "Moritz Dryburgh",
    "job": "Dental Hygienist",
    "company": "Schiller",
    "location": " Cole and Hackett",
    "lastLogin": "Sri Lanka",
    "favoriteColor": "8/8/2020",
    "FIELD8": "Crimson"
  },
  {
    "id": "16",
    "name": "Reid Semiras",
    "job": "Teacher",
    "company": "Sporer",
    "location": " Sipes and Rogahn",
    "lastLogin": "Poland",
    "favoriteColor": "7/30/2020",
    "FIELD8": "Green"
  },
  {
    "id": "17",
    "name": "Alec Lethby",
    "job": "Teacher",
    "company": "Reichel",
    "location": " Glover and Hamill",
    "lastLogin": "China",
    "favoriteColor": "2/28/2021",
    "FIELD8": "Khaki"
  },
  {
    "id": "18",
    "name": "Aland Wilber",
    "job": "Quality Control Specialist",
    "company": "Kshlerin",
    "location": " Rogahn and Swaniawski",
    "lastLogin": "Czech Republic",
    "favoriteColor": "9/29/2020",
    "FIELD8": "Purple"
  },
  {
    "id": "19",
    "name": "Teddie Duerden",
    "job": "Staff Accountant III",
    "company": "Pouros",
    "location": " Ullrich and Windler",
    "lastLogin": "France",
    "favoriteColor": "10/27/2020",
    "FIELD8": "Aquamarine"
  },
  {
    "id": "20",
    "name": "Lorelei Blackstone",
    "job": "Data Coordinator",
    "company": "Witting",
    "location": " Kutch and Greenfelder",
    "lastLogin": "Kazakhstan",
    "favoriteColor": "6/3/2020",
    "FIELD8": "Red"
  },
  {
    "id": "Name",
    "name": "Job",
    "job": "company",
    "company": "location",
    "location": "Last Login",
    "lastLogin": "Favorite Color",
    "favoriteColor": "",
    "FIELD8": ""
  }
]