import cloudinaryDB from "./../lib/cloudinary.config";
import { random } from "./ID_generators";

const upload = async (data, resource_type = "auto", folder, formats) => {
	try {
		const result = await cloudinaryDB.uploader.upload_large(data, {
			// upload_preset: upload_preset, // if has any
			public_id: random(7) + "-rohy",
			resource_type: resource_type,
			folder: folder,
			allowed_formats: formats,
			chunk_size: 1000000 * 1000, // (1MB * 1000) 1Go
		});

		return {
			...result,
		};
	} catch (error) {
		return {
			error: {
				message: error?.error?.message || error,
				status: error?.error?.http_code || 500,
			},
		};
	}
};

const getOne = async (dataName, folder, public_id) => {
	try {
		const result = await cloudinaryDB.search
			.expression(`folder:${folder} AND public_id:${public_id}`)
			.sort_by("public_id", "desc")
			.max_results(1)
			.execute();

		if (!result.resources.length)
			return {
				error: {
					message: `${dataName} not found.`,
					status: 404,
				},
			};

		const data = result.resources[0];

		return { data };
	} catch (error) {
		return {
			error: {
				message: error?.error?.message || error,
				status: error?.error?.http_code || 500,
			},
		};
	}
};

const deleteOne = async (dataName, folder, public_id) => {
	try {
		const result = await cloudinaryDB.search
			.expression(`folder:${folder} AND public_id:${public_id}`)
			.sort_by("public_id", "desc")
			.max_results(1)
			.execute();

		if (!result.resources.length) {
			return {
				error: {
					message: `${dataName} not found.`,
					status: 404,
				},
			};
		}

		await cloudinaryDB.uploader.destroy(`${folder}/${public_id}`);

		return {
			success: `${dataName} deleted successfully.`,
		};
	} catch (error) {
		return {
			error: {
				message: error?.error?.message || error,
				status: error?.error?.http_code || 500,
			},
		};
	}
};

const update = async (
	data,
	resource_type = "auto",
	dataName,
	folder,
	public_id
) => {
	try {
		const result = await cloudinaryDB.search
			.expression(`folder:${folder} AND public_id:${public_id}`)
			.sort_by("public_id", "desc")
			.max_results(1)
			.execute();

		if (!result.resources.length) {
			return {
				error: {
					message: `${dataName} not found.`,
					status: 404,
				},
			};
		}

		const { ...rest } = await cloudinaryDB.uploader.upload(data, {
			resource_type: resource_type,
			public_id: public_id,
			folder: folder,
		});

		return {
			...rest,
		};
	} catch (error) {
		return {
			error: {
				message: error?.error?.message || error,
				status: error?.error?.http_code || 500,
			},
		};
	}
};

export { upload, getOne, deleteOne, update };
