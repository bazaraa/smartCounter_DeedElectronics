package mn.mnba.mnba.util;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

public class EnumUtil {

	@SuppressWarnings("rawtypes")
	public static List<Map<String, String>> getAsMap(Enum[] pEnum) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		Map<String, String> hmap = null;

		for (Enum enumval : pEnum) {
			hmap = new HashMap<String, String>();
			hmap.put("ordinal", String.valueOf(enumval.ordinal()));
			hmap.put("name", enumval.name());
			hmap.put("string", enumval.toString());
			list.add(hmap);
		}

		return list;
	}

	@SuppressWarnings("rawtypes")
	public static List<Map<Integer, String>> getAsMapOrdinal(Enum[] pEnum) {
		List<Map<Integer, String>> list = new ArrayList<Map<Integer, String>>();
		Map<Integer, String> hmap = null;

		for (Enum enumval : pEnum) {
			hmap = new HashMap<Integer, String>();
			hmap.put(enumval.ordinal(), enumval.toString());
			list.add(hmap);
		}

		return list;
	}

	@SuppressWarnings("rawtypes")
	public static List<Map<String, String>> getAsMapString(Enum[] pEnum) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		Map<String, String> hmap = null;

		for (Enum enumval : pEnum) {
			hmap = new HashMap<String, String>();
			hmap.put(enumval.name(), enumval.toString());
			list.add(hmap);
		}

		return list;
	}

	@SuppressWarnings("rawtypes")
	public static List<Map<String, String>> getAsMapKeyLabel(Enum[] pEnum) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		Map<String, String> hmap = null;

		for (Enum enumval : pEnum) {
			hmap = new HashMap<String, String>();
			hmap.put("key", enumval.name());
			hmap.put("label", enumval.toString());
			list.add(hmap);
		}

		return list;
	}
}
