<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class QueryController extends Controller
{
    public function query(Request $request)
    {
        $database = $request->input('database');
        $query = $request->input('query');
        $rows = DB::table($database)->select(DB::raw($query))->get();
        return json_encode($rows);
    }

    public function databases()
    {
        $databases = DB::select('SHOW DATABASES');
        $databases_output = array();
        foreach($databases as $database) {
            array_push($databases_output, ((array)$database)["Database"]);
        }
        return json_encode($databases_output);
    }

    public function tables(Request $request)
    {
        $database = $request->input('database');
        $tables = DB::select(DB::raw('SHOW TABLES' . ' FROM ' . $database));
        $output_tables = array();
        foreach($tables as $table) {
            array_push($output_tables, ((array)$table)["Tables_in_" . $database]);
        }
        return json_encode($output_tables);
    }
}
